export interface Order {
    orderId: string;
    customerEmail: string;
}

export interface OrderItem {
    orderId: string;
    sku: string;
}