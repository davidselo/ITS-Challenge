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
  order.getOrdersWithTotalsQuery();
}
if (options.orderWithItems) {
  order.getOrdersWithItemsQuery();
}
if (options.findByOrderId) {
  const orderId = options.findByOrderId;
  order.findByOrderId(orderId);
}
if (options.findByCustomerEmail) {
  const customerEmail = options.findByCustomerEmail;
  order.findOrderByCustomerEmail(customerEmail);
}
