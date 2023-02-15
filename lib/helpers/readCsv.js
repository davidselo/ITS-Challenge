"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCsv = void 0;
const fs = require('fs');
const { parse } = require('csv-parse');
const produtcQueries_1 = require("../client/SqlQueries/produtcQueries");
const orderQueries_1 = require("../client/SqlQueries/orderQueries");
class ReadCsv {
    constructor(productsFile, ordersFile, ordersItemsFile, dbHandler) {
        this.productsFile = productsFile;
        this.ordersFile = ordersFile;
        this.ordersItemsFile = ordersItemsFile;
        this.dbHandler = dbHandler;
    }
    // Method for reading products csv file and inserting the data in the SqLite database.
    readProducts() {
        // We want to create a promise to make sure all tuples are read and inserted on the database.
        return new Promise((resolve, reject) => {
            // 1. Using fileStreams for reading the csv file.
            fs.createReadStream(this.productsFile)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                // 2. Process tuple and insert into database.
                // @todo: Feature - allow different header order in csv files.
                // @todo: validation before tuple is inserted into the database, out of the scope of this challenge.
                .on('data', (row) => {
                const product = {
                    simpleSku: row[0],
                    name: row[1],
                    price: row[2],
                    url: row[4],
                    specialPrice: row[3],
                };
                // 2.1 Insert product into product table.
                this.dbHandler.query((0, produtcQueries_1.insertProduct)(product.simpleSku, product.name, product.price, product.specialPrice, product.url));
            })
                // 3. Resolve promise when we finish reading the csv file.
                .on('end', () => {
                resolve(true);
            })
                // Reject the promise in case an error came up.
                .on('error', (error) => {
                console.error(error.message);
                // @todo: Remove database in case of fail.
                reject(true);
            });
        });
    }
    // Method for reading orders csv file and inserting the data in the SqLite database.
    readOrders() {
        // We want to create a promise to make sure all tuples are read and inserted on the database.
        return new Promise((resolve, reject) => {
            // 1. Read orders csv File
            fs.createReadStream(this.ordersFile)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                .on('data', (row) => {
                const order = {
                    orderId: row[0],
                    customerEmail: row[1],
                };
                // 2. Insert Order into orders table
                this.dbHandler.query((0, orderQueries_1.insertOrder)(order.orderId, order.customerEmail));
            })
                .on('end', () => {
                resolve(true);
            })
                .on('error', function (error) {
                console.error(error.message);
                // @todo: Remove database in case of fail.
                reject(true);
            });
        });
    }
    // Method for reading orders items csv file and inserting the data in the SqLite database.
    readOrderItems() {
        return new Promise((resolve, reject) => {
            // 1. Read orders Item csv File
            fs.createReadStream(this.ordersItemsFile)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                .on('data', (row) => {
                const orderItem = {
                    orderId: row[0],
                    sku: row[1],
                };
                // Insert row on OrderItem table
                this.dbHandler.query((0, orderQueries_1.insertOrderItem)(orderItem.orderId, orderItem.sku));
            })
                .on('end', () => {
                resolve(true);
            })
                .on('error', (error) => {
                console.error(error.message);
                // @todo: Remove database in case of fail.
                reject(true);
            });
        });
    }
    processCsvFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.readProducts();
                yield this.readOrders();
                yield this.readOrderItems();
            }
            catch (error) {
                console.error('An Issue happened on Database Initialisation.');
            }
        });
    }
}
exports.ReadCsv = ReadCsv;
