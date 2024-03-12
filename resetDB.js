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

  console.log('deleting all products...');
  await Product.deleteMany();
  console.log('complete!');

  console.log('inserting products...');
  await Product.insertMany(sampleProducts);
  console.log('complete!');

  db.disconnect();
}
