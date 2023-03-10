export const insertOrder = (orderId: string, customerEmail: string): string => {
  return `INSERT OR IGNORE INTO orders (order_id, customer_email) VALUES ('${orderId}','${customerEmail}');`;
};
export const insertOrderItem = (orderId: string, productSku: string): string => {
  return `INSERT INTO order_items (order_id, sku) VALUES ('${orderId}','${productSku}');`;
};

export const getOrdersWithTotalsQuery = `
    SELECT o.order_id, SUM(p.special_price) as totals
    FROM orders as o, products as p, order_items as oi
    -- GROUP BY order_id
    WHERE o.order_id = oi.order_id AND oi.sku = p.sku
    GROUP BY oi.order_id`;

export const getOrdersWithItemsQuery = `
    SELECT o.order_id, customer_email, GROUP_CONCAT(sku, ',') orderItems
    FROM orders AS o
    INNER JOIN order_items ON order_items.order_id = o.order_id
    GROUP BY o.order_id
    ORDER BY o.order_id;`;

export const findOrderByIdQuery = 'SELECT o.order_id, o.customer_email FROM orders AS o WHERE o.order_id= ?';

export const findOrderByEmailQuery = 'SELECT o.order_id, o.customer_email FROM orders AS o WHERE o.customer_email= ?';
