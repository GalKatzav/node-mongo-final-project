const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Category = require("../models/Category");
const auth = require("../middlewares/auth");

// .../categories

// Gets all the categories that I have in my DB
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Create new category
router.post("/", async (req, res) => {
  const newCategory = {
    name: req.body.name,
    userID: req.body.userID,
  };

  try {
    await Category.create(newCategory);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Need id that I want to delete
router.delete("/:id", async (req, res) => {
  const givenID = req.params.id;
  await Category.findByIdAndDelete(givenID);
  res.send(`category with id ${givenID} was deleted`);
});

// can change the name of the object(category), need to send as param category id that I want to change,
// send the token of the object that create the category and in the body the new name
router.patch("/:id", auth, async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });

    // Send back the updated user object in the response
    res.send("Change made");
  } catch (error) {
    console.error("Error in PATCH /update-category:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
