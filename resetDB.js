const db = require("./db");
const Product = require("./models/Product");
const User = require("./models/User");
const Task = require("./models/Task");

const sampleProducts = [
  { name: "apple", price: 42 },
  { name: "banana", price: 13 },
  { name: "melon", price: 666 },
];

const sampleUsers = [
  {
    _id: "60d8d87b89a2652038a4e28f",
    name: "gal",
    email: "gal@gmail.com",
    password: "gal",
  },
  {
    _id: "60d8d87b89a2652038a4e290",
    name: "viky",
    email: "viky@gmail.com",
    password: "viky",
  },
  {
    _id: "60d8d87b89a2652038a4e291",
    name: "toy",
    email: "toy@gmail.com",
    password: "toy",
  },
];

const sampleTasks = [
  {
    title: "Complete project proposal",
    userID: "60d8d87b89a2652038a4e28f" /* ObjectId of a user - gal */,
  },
  {
    title: "Prepare presentation slides",
    userID: "60d8d87b89a2652038a4e290" /* ObjectId of a user - viky */,
  },
  {
    title: "Review code changes",
    userID: "60d8d87b89a2652038a4e291" /* ObjectId of a user - toy*/,
  },
];

main();

async function main() {
  db.connect();

  // console.log("deleting all products...");
  // await Product.deleteMany();
  // console.log("complete!");

  // console.log("inserting products...");
  // await Product.insertMany(sampleProducts);
  // console.log("complete!");

  console.log("deleting all users...");
  await User.deleteMany();
  console.log("complete!");

  console.log("inserting users...");
  await User.insertMany(sampleUsers);
  console.log("complete!");

  console.log("deleting all tasks...");
  await Task.deleteMany();
  console.log("complete!");

  console.log("inserting tasks...");
  await Task.insertMany(sampleTasks);
  console.log("complete!");

  db.disconnect();
}
