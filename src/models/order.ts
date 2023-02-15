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
    let result: { 'Order Id': any; Totals: any }[] = [];
    this.dbHandler.db.each(getOrdersWithTotalsQuery, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      // @todo: return result and process in Console or Webapp.
      console.log(row);
      result.push({ 'Order Id': row.order_id, Totals: row.totals });
    });
    //console.log(result);
    console.table(result);
  }

  getOrdersWithItemsQuery() {
    this.dbHandler.db.each(getOrdersWithItemsQuery, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      // @todo: return result and process in Console or Webapp.
      console.log(row);
    });
  }

  findByOrderId(orderId: string) {
    this.dbHandler.db.get(findOrderByIdQuery, orderId, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      // @todo: return result and process in Console or Webapp.
      console.log(row);
    });
  }
  findOrderByCustomerEmail(customerEmail: string) {
    this.dbHandler.db.get(findOrderByEmailQuery, customerEmail, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      // @todo: return result and process in Console or Webapp.
      console.log(row);
    });
  }
}
