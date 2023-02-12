import { SqLiteClient } from './client/sqLiteClient';
import { ReadCsv} from './helpers/readCsv';


const myApp = () => {
  console.log('Hello ITS world!');

  // Initialize Database
  const databaseFilepath = "./src/database/inTheStyle.db";
  const db = new SqLiteClient(databaseFilepath);
  db.connectToDatabase();

  // Process CSV files.
  const productCsvFile = "./data/products.csv";
  const orderCsvFile = "./data/orders.csv";
  const orderItemsCsvFile = "./data/order_item.csv";
  
  const csvHelper = new ReadCsv(productCsvFile, orderCsvFile, orderItemsCsvFile, db);
  csvHelper.processCsvFiles();

}

module.exports = myApp;
