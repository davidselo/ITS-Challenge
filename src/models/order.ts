import { SqLiteClient } from '../client/sqLiteClient';
// @todo: Change method names adding query suffix.
import {
  getOrdersWithTotals,
  getOrdersWithItems,
  findOrderById,
  findOrderByEmail,
} from '../client/SqlQueries/orderQueries';
export class Order {
  dbHandler;

  constructor(dbHandler: SqLiteClient) {
    this.dbHandler = dbHandler;
  }

  getOrdersWithTotals() {
    this.dbHandler.db.each(getOrdersWithTotals, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }

  getOrdersWithItems() {
    this.dbHandler.db.each(getOrdersWithItems, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }

  findByOrderId(orderId: string) {
    this.dbHandler.db.get(findOrderById, orderId, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }
  findOrderByCustomerEmail(customerEmail: string) {
    this.dbHandler.db.get(findOrderByEmail, customerEmail, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }
}
