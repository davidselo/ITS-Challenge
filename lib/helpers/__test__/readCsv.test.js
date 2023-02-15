"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readCsv_1 = require("../readCsv");
const sqLiteClient_1 = require("../../client/sqLiteClient");
const produtcQueries_1 = require("../../client/SqlQueries/produtcQueries");
jest.mock('../../client/sqLiteClient');
let readCsv, spy;
let productsCsvFileFixture, ordersCsvFileFixture, orderItemsCsvFileFixture, testingFilePath = 'testFilePath.db', dbHandler;
beforeEach(() => {
    // SqLiteClient.mockClear();
});
describe('ReadCsv Class Test Suite', () => {
    beforeEach(() => {
        productsCsvFileFixture = './src/tests/fixtures/products.csv';
        ordersCsvFileFixture = './src/tests/fixtures/orders.csv';
        orderItemsCsvFileFixture = './src/tests/fixtures/order_item.csv';
        dbHandler = new sqLiteClient_1.SqLiteClient(testingFilePath);
        readCsv = new readCsv_1.ReadCsv(productsCsvFileFixture, ordersCsvFileFixture, orderItemsCsvFileFixture, dbHandler);
        spy = jest.spyOn(dbHandler, 'query').mockImplementation(() => {
            return true;
        });
    });
    test('Test ReadCsv constructor', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        // Act
        yield readCsv.readProducts();
        // Assert
        expect(readCsv.productsFile).toBe(productsCsvFileFixture);
        expect(readCsv.ordersFile).toBe(ordersCsvFileFixture);
        expect(readCsv.ordersItemsFile).toBe(orderItemsCsvFileFixture);
    }));
    test('Test readProducts method', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        // Act
        yield readCsv.readProducts();
        // Assert
        expect(dbHandler.query).toBeCalledTimes(2);
        expect(dbHandler.query).toHaveBeenNthCalledWith(2, (0, produtcQueries_1.insertProduct)('OBFOANK41319-SH4', 'CHESTNUT MINI FAUX SUEDE BOOT-SH4', 28.0, 27.0, 'chestnut-mini-faux-suede-boot'));
    }));
});
