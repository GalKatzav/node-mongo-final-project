const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const auth = require("../middlewares/auth");

// .../tasks

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

// needs to send the title, userId and token in "Authoriztaion" - postman
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

// can change the title of the object(task), need to send as param task id that I want to change,
// send the token of the object that create the task and in the body the new title
router.patch("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { title: req.body.title });

    // Send back the updated user object in the response
    res.send("Change made");
  } catch (error) {
    console.error("Error in PATCH /update-user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
