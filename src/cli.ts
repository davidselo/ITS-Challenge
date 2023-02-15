const { Command } = require('commander');
const { SqLiteClient } = require('./client/sqLiteClient');
const { Order } = require('./models/order');
const figlet = require('figlet');

const program = new Command();

console.log(figlet.textSync('ITS Manager'));

const databaseFilepath = './src/database/inTheStyle.db';
const db = new SqLiteClient(databaseFilepath);
db.connectToDatabase();
const order = new Order(db);

async function runGetOrdersWithTotals() {
  const result = await order.getOrdersWithTotalsQuery();
  console.table(result);
}
async function runGetOrdersWithItems() {
  const result = await order.getOrdersWithItemsQuery();
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
  order.findByOrderId(orderId);
}
if (options.findByCustomerEmail) {
  const customerEmail = options.findByCustomerEmail;
  order.findOrderByCustomerEmail(customerEmail);
}
