"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqLiteClient_1 = require("./client/sqLiteClient");
const order_1 = require("./models/order");
const myApp = () => {
    console.log('Hello ITS world!');
    // Initialize Database
    const databaseFilepath = './src/database/inTheStyle.db';
    const db = new sqLiteClient_1.SqLiteClient(databaseFilepath);
    db.connectToDatabase();
    // Printing out Orders with Order Totals.
    const order = new order_1.Order(db);
    //order.getOrdersWithTotalsQuery();
    // order.getOrdersWithItemsQuery();
    // Testing find Order By id
    // const orderId = '12314324';
    //order.findByOrderId(orderId);
    // Testing find Order By email
    const email = 'useremail4@example.com';
    order.findOrderByCustomerEmail(email);
};
module.exports = myApp;
