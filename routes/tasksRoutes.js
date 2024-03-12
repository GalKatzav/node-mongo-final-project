const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// router.get("/", async (req, res) => {
//   const allTasks = await Task.find().populate("userID");
//   res.json(allTasks);
// });

router.post("/", async (req, res) => {
  const newTask = {
    title: req.body.title,
    userID: req.body.userID,
  };

  try {
    await Task.create(newTask);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Need id that i want to delete
router.delete("/:id", async (req, res) => {
  const givenID = req.params.id;
  await Task.findByIdAndDelete(givenID);
  res.send(`task with id ${givenID} was deleted`);
});

module.exports = router;
