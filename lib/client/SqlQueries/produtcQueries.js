"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertProduct = void 0;
const insertProduct = (sku, name, price, specialPrice, url) => {
    return `INSERT OR IGNORE INTO products (sku, name, price, special_price, url) VALUES ('${sku}','${name}',${price},${specialPrice},'${url}');`;
};
exports.insertProduct = insertProduct;
