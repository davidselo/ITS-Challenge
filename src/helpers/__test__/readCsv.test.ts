import { ReadCsv } from '../readCsv';
import { SqLiteClient } from '../../client/sqLiteClient';
import { insertProduct } from '../../client/SqlQueries/produtcQueries';

jest.mock('../../client/sqLiteClient');
let readCsv: ReadCsv, spy;
let productsCsvFileFixture: string,
  ordersCsvFileFixture: string,
  orderItemsCsvFileFixture: string,
  testingFilePath: string = 'testFilePath.db',
  dbHandler: SqLiteClient;

beforeEach(() => {
  SqLiteClient.mockClear();
});

describe('ReadCsv Class Test Suite', () => {
  beforeEach(() => {
    productsCsvFileFixture = './src/tests/fixtures/products.csv';
    ordersCsvFileFixture = './src/tests/fixtures/orders.csv';
    orderItemsCsvFileFixture = './src/tests/fixtures/order_item.csv';
    dbHandler = new SqLiteClient(testingFilePath);
    readCsv = new ReadCsv(productsCsvFileFixture, ordersCsvFileFixture, orderItemsCsvFileFixture, dbHandler);
    spy = jest.spyOn(dbHandler, 'query').mockImplementation(() => {
      return true;
    });
  });
  test('Test ReadCsv constructor', async () => {
    // Arrange

    // Act
    await readCsv.readProducts();

    // Assert
    expect(readCsv.productsFile).toBe(productsCsvFileFixture);
    expect(readCsv.ordersFile).toBe(ordersCsvFileFixture);
    expect(readCsv.ordersItemsFile).toBe(orderItemsCsvFileFixture);
  });

  test('Test readProducts method', async () => {
    // Arrange

    // Act
    await readCsv.readProducts();

    // Assert
    expect(dbHandler.query).toBeCalledTimes(2);
    expect(dbHandler.query).toHaveBeenNthCalledWith(
      2,
      insertProduct(
        'OBFOANK41319-SH4',
        'CHESTNUT MINI FAUX SUEDE BOOT-SH4',
        28.0,
        27.0,
        'chestnut-mini-faux-suede-boot',
      ),
    );
  });
});
