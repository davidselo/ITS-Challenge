"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const orderQueries_1 = require("../client/SqlQueries/orderQueries");
class Order {
    constructor(dbHandler) {
        this.dbHandler = dbHandler;
    }
    getOrdersWithTotalsQuery() {
        this.dbHandler.db.each(orderQueries_1.getOrdersWithTotalsQuery, (error, row) => {
            if (error) {
                return console.log(error.message);
            }
            // @todo: return result and process in Console or Webapp.
            console.log(row);
        });
    }
    getOrdersWithItemsQuery() {
        this.dbHandler.db.each(orderQueries_1.getOrdersWithItemsQuery, (error, row) => {
            if (error) {
                return console.log(error.message);
            }
            // @todo: return result and process in Console or Webapp.
            console.log(row);
        });
    }
    findByOrderId(orderId) {
        this.dbHandler.db.get(orderQueries_1.findOrderByIdQuery, orderId, (error, row) => {
            if (error) {
                return console.log(error.message);
            }
            // @todo: return result and process in Console or Webapp.
            console.log(row);
        });
    }
    findOrderByCustomerEmail(customerEmail) {
        this.dbHandler.db.get(orderQueries_1.findOrderByEmailQuery, customerEmail, (error, row) => {
            if (error) {
                return console.log(error.message);
            }
            // @todo: return result and process in Console or Webapp.
            console.log(row);
        });
    }
}
exports.Order = Order;
