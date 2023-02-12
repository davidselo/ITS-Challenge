export const insertOrder = (orderId: string, customerEmail: string): string => {
    return `INSERT OR IGNORE INTO orders (order_id, customer_email) VALUES ('${orderId}','${customerEmail}');`
}
export const insertOrderItem = (orderId: string, productSku: string): string => {
    return `INSERT OR IGNORE INTO order_items (order_id, sku) VALUES ('${orderId}','${productSku}');`
}