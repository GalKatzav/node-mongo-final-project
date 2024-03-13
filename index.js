const express = require("express");
const db = require("./db");
const app = express();
const port = 3000;

db.connect();

app.use(express.json());

app.get("/ping", (req, res) => {
  console.log("I got ping!");
  res.send("pong");
});

app.use("/products", require("./routes/productsRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use("/tasks", require("./routes/tasksRoutes"));
// app.use("/categories", require("./routes/categoryRoutes"));

app.use((req, res, next, err) => {
  console.log(err);
});

app.use((req, res, next, err) => {
  console.log(err);
})

app.listen(port, () => {
  console.log("listen to port", port);
});
