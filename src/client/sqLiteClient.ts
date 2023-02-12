import { ReadCsv } from "../helpers/readCsv";

const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

// Process CSV files.
const productCsvFile = "./data/products.csv";
const orderCsvFile = "./data/orders.csv";
const orderItemsCsvFile = "./data/order_item.csv";

export class SqLiteClient {
    filepath: string;
    db: any;

    constructor( filepath: string){
        this.filepath = filepath;
    }

    connectToDatabase() {
        // 1. Case database defined, return it.
        if(fs.existsSync(this.filepath)){
            this.db = new sqlite3.Database(this.filepath);
        }
        // 2. Case database doesn't exists, we inicializate it.
        else{
            const db = new sqlite3.Database(this.filepath, (error: { message: any; }) => {
                if(error){
                    return console.error(error.message);
                }
                // create Database.
                this.initialiseDatabase(db);
            });
            this.db = db;
        }
        return this.db;
    }

    initialiseDatabase(databaseHandler: any){
        databaseHandler.exec(`
         CREATE TABLE IF NOT EXISTS products
         (
            sku             TEXT PRIMARY KEY,
            name            TEXT,
            price           REAL,
            special_price   REAL,
            url             TEXT
         );
         
         CREATE TABLE IF NOT EXISTS orders
         (
            order_id        INTEGER PRIMARY KEY,
            customer_email  TEXT
         );
         
         CREATE TABLE IF NOT EXISTS order_items
         (
            order_id        INTEGER,
            sku             TEXT
         );

        `);
        const csvHelper = new ReadCsv(productCsvFile, orderCsvFile, orderItemsCsvFile, this.db);
        csvHelper.processCsvFiles();
    }

    query(queryStatement: string){
        this.db.exec(queryStatement);
    }
}