const fs = require('fs');
const { parse } = require('csv-parse');
import { SqLiteClient } from '../client/sqLiteClient';
import { Product } from '../contracts/Product';
import { Order, OrderItem } from '../contracts/Order';
import { insertProduct } from '../client/SqlQueries/produtcQueries';
import { insertOrder, insertOrderItem } from '../client/SqlQueries/orderQueries';

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

  // Method for reading products csv file and inserting the data in the SqLite database.
  readProducts(): Promise<boolean> {
    // We want to create a promise to make sure all tuples are read and inserted on the database.
    return new Promise((resolve, reject) => {
      // 1. Using fileStreams for reading the csv file.
      fs.createReadStream(this.productsFile)
        .pipe(parse({ delimiter: ',', from_line: 2 }))

        // 2. Process tuple and insert into database.
        // @todo: Feature - allow different header order in csv files.
        // @todo: validation before tuple is inserted into the database, out of the scope of this challenge.
        .on('data', (row: any) => {
          const product: Product = {
            simpleSku: row[0],
            name: row[1],
            price: row[2],
            url: row[4],
            specialPrice: row[3],
          };

          // 2.1 Insert product into product table.
          this.dbHandler.query(
            insertProduct(product.simpleSku, product.name, product.price, product.specialPrice, product.url),
          );
        })

        // 3. Resolve promise when we finish reading the csv file.
        .on('end', () => {
          resolve(true);
        })

        // Reject the promise in case an error came up.
        .on('error', (error: { message: any }) => {
          console.error(error.message);
          // @todo: Remove database in case of fail.
          reject(true);
        });
    });
  }

  // Method for reading orders csv file and inserting the data in the SqLite database.
  readOrders(): Promise<boolean> {
    // We want to create a promise to make sure all tuples are read and inserted on the database.
    return new Promise((resolve, reject) => {
      // 1. Read orders csv File
      fs.createReadStream(this.ordersFile)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', (row: any) => {
          const order: Order = {
            orderId: row[0],
            customerEmail: row[1],
          };

          // 2. Insert Order into orders table
          this.dbHandler.query(insertOrder(order.orderId, order.customerEmail));
        })
        .on('end', () => {
          resolve(true);
        })
        .on('error', function (error: { message: any }) {
          console.error(error.message);
          // @todo: Remove database in case of fail.
          reject(true);
        });
    });
  }

  // Method for reading orders items csv file and inserting the data in the SqLite database.
  readOrderItems(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // 1. Read orders Item csv File
      fs.createReadStream(this.ordersItemsFile)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', (row: any) => {
          const orderItem: OrderItem = {
            orderId: row[0],
            sku: row[1],
          };
          // Insert row on OrderItem table
          this.dbHandler.query(insertOrderItem(orderItem.orderId, orderItem.sku));
        })
        .on('end', () => {
          resolve(true);
        })
        .on('error', (error: { message: any }) => {
          console.error(error.message);
          // @todo: Remove database in case of fail.
          reject(true);
        });
    });
  }

  async processCsvFiles() {
    try {
      await this.readProducts();
      await this.readOrders();
      await this.readOrderItems();
    } catch (error) {
      console.error('An Issue happened on Database Initialisation.');
    }
  }
}
