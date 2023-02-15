import { SqLiteClient } from './client/sqLiteClient';
import { Order } from './models/order';

const myApp = async () => {
  console.log('Hello ITS world!');

  // Initialize Database
  const databaseFilepath = './src/database/inTheStyle.db';
  const db = new SqLiteClient(databaseFilepath);
  db.connectToDatabase();

  // Printing out Orders with Order Totals.
  const order = new Order(db);
  //order.getOrdersWithTotalsQuery();
  const orderTest = await order.getOrdersWithTotalsQuery();
  //console.table(orderTest);

  // order.getOrdersWithItemsQuery();

  // Testing find Order By id
  // const orderId = '12314324';
  //order.findByOrderId(orderId);

  // Testing find Order By email
  const email = 'useremail4@example.com';
  order.findOrderByCustomerEmail(email);
};

module.exports = myApp;
