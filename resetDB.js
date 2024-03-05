const db = require("./db");
const Product = require("./models/Product");

const sampleProducts = [
  { name: "apple", price: 42 },
  { name: "banana", price: 13 },
  { name: "melon", price: 666 },
];

main();

async function main() {
  db.connect();

  console.log();
  // delete all product
  await Product.deleteMany({});

  // insert all product sample
  await Product.insertMany(sampleProducts);

  db.disconnect();
}
