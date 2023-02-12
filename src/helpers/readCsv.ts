const fs = require('fs');
const { parse } = require('csv-parse');
import { SqLiteClient } from "../client/sqLiteClient";
import { Product } from "../contracts/Product";
import { Order, OrderItem } from "../contracts/Order";
import { insertProduct } from "../client/SqlQueries/produtcQueries";
import { insertOrder, insertOrderItem } from "../client/SqlQueries/orderQueries";


export class ReadCsv {
    
    // Properties definition.
    productsFile: string;
    ordersFile: string;
    ordersItemsFile: string;
    dbHandler: SqLiteClient;

    constructor(productsFile: string, ordersFile: string, ordersItemsFile: string, dbHandler: SqLiteClient) {
        this.productsFile = productsFile;
        this.ordersFile = ordersFile;
        this.ordersItemsFile = ordersItemsFile;
        this.dbHandler = dbHandler;
    }

    readProducts(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.productsFile)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                .on('data', (row: any) => {
                    const product: Product = {
                        simpleSku: row[0],
                        name: row[1],
                        price: row[2],
                        url: row[4],
                        specialPrice: row[3],
                    };
                    // insert product into product table.
                    this.dbHandler.query(insertProduct(product.simpleSku, product.name, product.price, product.specialPrice, product.url));
                    
                })
                .on('end', () => {
                    resolve(true);
                })
                .on('error', function (error: { message: any }) {
                    reject(true);
                });
        });
    }

    readOrders(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // 1. Read orders csv File
            fs.createReadStream(this.ordersFile)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                .on('data', (row: any) => {
                    const order: Order = {
                        orderId: row[0],
                        customerEmail: row[1],
                    };
                    // 2. Add tuples to the Map object.
                    // Insert Order into orders table
                    this.dbHandler.query(insertOrder(order.orderId,order.customerEmail));
                })
                .on('end', () => {
                    resolve(true);
                })
                .on('error', function (error: { message: any }) {
                    reject(true);
                });
        });
    }

    readOrderItems(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.ordersItemsFile)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                .on('data', (row: any) => {
                    const orderItem: OrderItem = {
                        orderId: row[0],
                        sku: row[1],
                    };
                    // Insert row on OrderItem table
                    this.dbHandler.query(insertOrderItem(orderItem.orderId,orderItem.sku));
                })
                .on('end', () => {
                    resolve(true);
                })
                .on('error', () => {
                    console.log()
                    reject(true);
                });
        });
    }

    async processCsvFiles(){
        await this.readProducts();
        await this.readOrders();
        await this.readOrderItems();
    }
} 