export const insertOrder = (orderId: string, customerEmail: string): string => {
    return `INSERT OR IGNORE INTO orders (order_id, customer_email) VALUES ('${orderId}','${customerEmail}');`
}