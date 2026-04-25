export async function saveOrder(order: any) { console.log('Static mode: Order not saved', order); return { success: true }; }
export async function getOrders() { return []; }
export async function updateOrderStatus() { return { success: true }; }
export async function getAnalytics() { return null; }
