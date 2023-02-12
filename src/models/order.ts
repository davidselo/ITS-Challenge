import { SqLiteClient } from '../client/sqLiteClient';
import { getOrdersWithTotals, getOrdersWithItems, findByOrderId } from '../client/SqlQueries/orderQueries';
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
    this.dbHandler.db.get(findByOrderId, orderId, (error: any, row: any) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(row);
    });
  }
}
