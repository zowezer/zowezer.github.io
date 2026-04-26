export async function saveOrder(order: any) { return { success: true }; }
export async function getOrders() { return []; }
export async function updateOrderStatus(id: string, status: string) { return { success: true, order: null, error: null }; }
export async function getAnalytics() { return null; }
