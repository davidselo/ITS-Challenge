import { SqLiteClient } from '../client/sqLiteClient';
import {
  getOrdersWithTotalsQuery,
  getOrdersWithItemsQuery,
  findOrderByIdQuery,
  findOrderByEmailQuery,
} from '../client/SqlQueries/orderQueries';
export class Order {
  dbHandler;

  constructor(dbHandler: SqLiteClient) {
    this.dbHandler = dbHandler;
  }

  getOrdersWithTotalsQuery() {
    this.dbHandler.db.each(getOrdersWithTotalsQuery, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }

  getOrdersWithItemsQuery() {
    this.dbHandler.db.each(getOrdersWithItemsQuery, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }

  findByOrderId(orderId: string) {
    this.dbHandler.db.get(findOrderByIdQuery, orderId, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }
  findOrderByCustomerEmail(customerEmail: string) {
    this.dbHandler.db.get(findOrderByEmailQuery, customerEmail, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }
}
