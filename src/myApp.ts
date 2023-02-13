import { SqLiteClient } from './client/sqLiteClient';
import { Order } from './models/order';

const myApp = () => {
  console.log('Hello ITS world!');

  // Initialize Database
  const databaseFilepath = './src/database/inTheStyle.db';
  const db = new SqLiteClient(databaseFilepath);
  db.connectToDatabase();

  // Printing out Orders with Order Totals.
  const order = new Order(db);
  //order.getOrdersWithTotals();

  //order.getOrdersWithItems();

  // Testing find Order By id
  // const orderId = '12314324';
  // order.findByOrderId(orderId);

  // Testing find Order By email
  //const email = 'useremail4@example.com';
  //order.findOrderByCustomerEmail(email);
};

module.exports = myApp;
