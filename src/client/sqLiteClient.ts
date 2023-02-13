import { ReadCsv } from '../helpers/readCsv';
import { databaseSetupScript } from './SqlQueries/scripts';

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Process CSV files.
const productCsvFile = './data/products.csv';
const orderCsvFile = './data/orders.csv';
const orderItemsCsvFile = './data/order_item.csv';

export class SqLiteClient {
  databasePath: string;
  db: any; // DB handler.

  constructor(databasePath: string) {
    this.databasePath = databasePath;
  }

  connectToDatabase() {
    // 1. Case database defined, return it.
    if (fs.existsSync(this.databasePath)) {
      this.db = new sqlite3.Database(this.databasePath);
    }
    // 2. Case database doesn't exists, we inicializate it.
    else {
      const db = new sqlite3.Database(this.databasePath, (error: { message: any }) => {
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

  initialiseDatabase(databaseHandler: any) {
    // 1. Create Database
    databaseHandler.exec(databaseSetupScript);

    // 2. Initialising CSV helper class
    const csvHelper = new ReadCsv(productCsvFile, orderCsvFile, orderItemsCsvFile, this);

    // 3. Processing CSV's files.
    csvHelper.processCsvFiles();
  }

  // Method to run raw queries on the datbase.
  query(queryStatement: string) {
    this.db.exec(queryStatement);
  }
}
