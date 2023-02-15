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
    return new Promise((resolve, reject) => {
      this.dbHandler.db.each(
        getOrdersWithTotalsQuery,
        (error: any, row: any) => {
          if (error) {
            console.error(error.message);
            reject(error.message);
          } else {
            result.push({ 'Order Id': row.order_id, Totals: row.totals });
          }
        },
        (error: any, n: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  getOrdersWithItemsQuery() {
    let result: { 'Order Id': any; 'Customer Email': any; 'Order Items': any }[] = [];
    return new Promise((resolve, reject) => {
      this.dbHandler.db.each(
        getOrdersWithItemsQuery,
        (error: any, row: any) => {
          if (error) {
            console.error(error.message);
            reject(error.message);
          } else {
            result.push({
              'Order Id': row.order_id,
              'Customer Email': row.customer_email,
              'Order Items': row.orderItems,
            });
          }
        },
        (error: any, n: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
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
