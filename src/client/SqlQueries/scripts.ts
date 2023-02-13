export const databaseSetupScript = `
         CREATE TABLE IF NOT EXISTS products
         (
            sku             TEXT PRIMARY KEY,
            name            TEXT,
            price           REAL,
            special_price   REAL,
            url             TEXT
         );
         
         CREATE TABLE IF NOT EXISTS orders
         (
            order_id        INTEGER PRIMARY KEY,
            customer_email  TEXT
         );
         
         CREATE TABLE IF NOT EXISTS order_items
         (
            order_id        INTEGER,
            sku             TEXT
         );

        `;
