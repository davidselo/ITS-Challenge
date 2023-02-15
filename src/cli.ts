const { Command } = require('commander');
const { SqLiteClient } = require('./client/sqLiteClient');
const { Order } = require('./models/order');
const figlet = require('figlet');

const program = new Command();

console.log(figlet.textSync('ITS Manager'));

const databaseFilepath = './src/database/inTheStyle.db';

async function getOrderModel() {
  const db = new SqLiteClient(databaseFilepath);
  await db.connectToDatabase();
  const ordeModel = new Order(db);
  return ordeModel;
}

async function runGetOrdersWithTotals() {
  const orderModel = await getOrderModel();
  const result = await orderModel.getOrdersWithTotalsQuery();
  console.table(result);
}
async function runGetOrdersWithItems() {
  const orderModel = await getOrderModel();
  const result = await orderModel.getOrdersWithItemsQuery();
  console.table(result);
}
async function runFindByOrderId(orderId: any) {
  const orderModel = await getOrderModel();
  const result = await orderModel.findByOrderId(orderId);
  console.table(result);
}
async function runFindByCustomerEmail(customerEmail: any) {
  const orderModel = await getOrderModel();
  const result = await orderModel.findOrderByCustomerEmail(customerEmail);
  console.table(result);
}

program
  .version('1.0.0')
  .description('ITS Console Tool')
  .option('-ot, --orderWithTotals', 'List Orders with totals.')
  .option('-owi, --orderWithItems', 'List Orders with Items.')
  .option('-fboi, --findByOrderId <value>', 'Find Order by ID.')
  .option('-fbce, --findByCustomerEmail <value>', 'Find Order by Customer Email.')
  .parse(process.argv);

const options = program.opts();

if (options.orderWithTotals) {
  runGetOrdersWithTotals();
}
if (options.orderWithItems) {
  runGetOrdersWithItems();
}
if (options.findByOrderId) {
  const orderId = options.findByOrderId;
  runFindByOrderId(orderId);
}
if (options.findByCustomerEmail) {
  const customerEmail = options.findByCustomerEmail;
  runFindByCustomerEmail(customerEmail);
}
