"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir);
  }
}

export async function saveOrder(orderData: any) {
  try {
    await ensureDataDir();
    let orders = [];
    try {
      const content = await fs.readFile(ORDERS_FILE, "utf-8");
      orders = JSON.parse(content);
    } catch {}

    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      history: [{ status: "pending", date: new Date().toISOString(), note: "Order placed by customer" }]
    };

    orders.push(newOrder);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
    return { success: true, orderId: newOrder.id };
  } catch (error) {
    return { success: false, error: "Failed to save order" };
  }
}

export async function getOrders() {
  try {
    const content = await fs.readFile(ORDERS_FILE, "utf-8");
    const orders = JSON.parse(content);
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string, note?: string) {
  try {
    await ensureDataDir();
    const content = await fs.readFile(ORDERS_FILE, "utf-8");
    let orders = JSON.parse(content);
    
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);
    if (orderIndex === -1) return { success: false, error: "Order not found" };

    orders[orderIndex].status = newStatus;
    
    if (!orders[orderIndex].history) orders[orderIndex].history = [];
    orders[orderIndex].history.push({
      status: newStatus,
      date: new Date().toISOString(),
      note: note || `Status uppdaterad till ${newStatus}`
    });

    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
    revalidatePath("/admin");
    return { success: true, order: orders[orderIndex] };
  } catch (error) {
    return { success: false, error: "Failed to update order" };
  }
}

export async function getAnalytics() {
  try {
    const orders = await getOrders();
    const now = new Date();
    
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;

    const processProductStats = (orderList: any[]) => {
      const products: Record<string, { sold: number, returned: number, revenue: number }> = {};
      orderList.forEach(o => {
        o.items.forEach((item: any) => {
          if (!products[item.name]) products[item.name] = { sold: 0, returned: 0, revenue: 0 };
          if (o.status === 'retur') {
            products[item.name].returned += item.quantity;
          } else {
            products[item.name].sold += item.quantity;
            products[item.name].revenue += item.price * item.quantity;
          }
        });
      });
      return Object.entries(products).map(([name, stats]) => ({ name, ...stats })).sort((a, b) => b.sold - a.sold);
    };

    const calcDetailedStats = (timeFrameMs: number, type: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
      const timeframeOrders = orders.filter((o: any) => {
        const orderDate = new Date(o.createdAt);
        return (now.getTime() - orderDate.getTime()) <= timeFrameMs;
      });

      const successfulOrders = timeframeOrders.filter(o => o.status !== 'retur');
      const returnedOrders = timeframeOrders.filter(o => o.status === 'retur');
      const revenue = successfulOrders.reduce((sum: number, o: any) => sum + o.total, 0);

      // Advanced Peak Analysis
      let peakLabel = "";
      let distribution: number[] = [];
      let labels: string[] = [];

      if (type === 'daily') {
        distribution = new Array(24).fill(0);
        timeframeOrders.forEach(o => distribution[new Date(o.createdAt).getHours()]++);
        const peak = distribution.indexOf(Math.max(...distribution));
        peakLabel = `${peak}:00 — ${peak + 1}:00`;
        labels = ["00:00", "12:00", "23:00"];
      } else if (type === 'weekly') {
        distribution = new Array(7).fill(0);
        timeframeOrders.forEach(o => distribution[new Date(o.createdAt).getDay()]++);
        const days = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
        peakLabel = days[distribution.indexOf(Math.max(...distribution))];
        labels = ["Sön", "Ons", "Lör"];
      } else if (type === 'monthly') {
        distribution = new Array(4).fill(0); // Weeks
        timeframeOrders.forEach(o => {
          const day = new Date(o.createdAt).getDate();
          distribution[Math.min(Math.floor((day-1)/7), 3)]++;
        });
        peakLabel = `Vecka ${distribution.indexOf(Math.max(...distribution)) + 1}`;
        labels = ["V1", "V2", "V3", "V4"];
      } else {
        distribution = new Array(12).fill(0); // Months
        timeframeOrders.forEach(o => distribution[new Date(o.createdAt).getMonth()]++);
        const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
        peakLabel = months[distribution.indexOf(Math.max(...distribution))];
        labels = ["Jan", "Jun", "Dec"];
      }

      return {
        revenue,
        orders: successfulOrders.length,
        returns: returnedOrders.length,
        avg: successfulOrders.length > 0 ? (revenue / successfulOrders.length).toFixed(0) : 0,
        productPerformance: processProductStats(timeframeOrders),
        peakLabel,
        distribution,
        labels
      };
    };

    const allTimeStats = calcDetailedStats(now.getTime(), 'yearly'); // Use yearly logic for all-time distribution

    return {
      daily: calcDetailedStats(oneDay, 'daily'),
      weekly: calcDetailedStats(oneWeek, 'weekly'),
      monthly: calcDetailedStats(oneMonth, 'monthly'),
      yearly: calcDetailedStats(oneYear, 'yearly'),
      allTime: {
        revenue: orders.filter((o: any) => o.status !== 'retur').reduce((sum: number, o: any) => sum + o.total, 0),
        orders: orders.length,
        returns: orders.filter((o: any) => o.status === 'retur').length,
        productPerformance: processProductStats(orders),
        distribution: allTimeStats.distribution,
        peakLabel: allTimeStats.peakLabel,
        labels: allTimeStats.labels
      }
    };
  } catch (error) {
    return null;
  }
}
