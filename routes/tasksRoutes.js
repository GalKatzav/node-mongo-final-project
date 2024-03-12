const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const auth = require("../middlewares/auth");

// router.get("/", async (req, res) => {
//   try {
//     console.log(req.user.id);
//     const tasks = await Task.find({ userID: req.user.id });
//     res.json(tasks);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });

router.get("/", async (req, res) => {
  const allTasks = await Task.find();
  res.json(allTasks);
});

router.post("/", async (req, res) => {
  const newTask = {
    title: req.body.title,
    userID: req.body.userId,
  };

  try {
    await Task.create(newTask);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
