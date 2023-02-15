"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqLiteClient = void 0;
const readCsv_1 = require("../helpers/readCsv");
const scripts_1 = require("./SqlQueries/scripts");
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
// Process CSV files.
const productCsvFile = './data/products.csv';
const orderCsvFile = './data/orders.csv';
const orderItemsCsvFile = './data/order_item.csv';
class SqLiteClient {
    constructor(databasePath) {
        this.databasePath = databasePath;
    }
    connectToDatabase() {
        // 1. Case database defined, return it.
        if (fs.existsSync(this.databasePath)) {
            this.db = new sqlite3.Database(this.databasePath);
        }
        // 2. Case database doesn't exists, we inicializate it.
        else {
            const db = new sqlite3.Database(this.databasePath, (error) => {
                if (error) {
                    return console.error(error.message);
                }
                // create Database.
                this.initialiseDatabase(db);
            });
            this.db = db;
        }
        return this.db;
    }
    initialiseDatabase(databaseHandler) {
        // 1. Create Database
        databaseHandler.exec(scripts_1.databaseSetupScript);
        // 2. Initialising CSV helper class
        const csvHelper = new readCsv_1.ReadCsv(productCsvFile, orderCsvFile, orderItemsCsvFile, this);
        // 3. Processing CSV's files.
        csvHelper.processCsvFiles();
    }
    // Method to run raw queries on the datbase.
    query(queryStatement) {
        this.db.exec(queryStatement);
    }
}
exports.SqLiteClient = SqLiteClient;
