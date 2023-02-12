import { SqLiteClient } from './client/sqLiteClient';
import { ReadCsv} from './helpers/readCsv';
import { Order } from './models/order';


const myApp = () => {
  console.log('Hello ITS world!');

  // Initialize Database
  const databaseFilepath = "./src/database/inTheStyle.db";
  const db = new SqLiteClient(databaseFilepath);
  db.connectToDatabase();


  // Printing out Orders with Order Totals.
  const order = new Order(db);
  // order.getOrdersWithTotals();

  //order.getOrdersWithItems();

  const orderId = "12314324";
  order.findByOrderId(orderId);


}

module.exports = myApp;
