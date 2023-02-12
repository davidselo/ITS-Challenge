export const insertProduct = (sku: string, name: string, price: number, specialPrice: number, url: string): string => {
    return `INSERT OR IGNORE INTO products (sku, name, price, special_price, url) VALUES ('${sku}','${name}',${price},${specialPrice},'${url}');`
}