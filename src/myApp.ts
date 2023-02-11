import { SqLiteClient } from './client/sqLiteClient';

const myApp = () => {
  console.log('Hello ITS world!');

  // Initialize Database
  const filepath = "./src/database/inTheStyle.db";
  const db = new SqLiteClient(filepath);
  db.connectToDatabase();
}

module.exports = myApp;
