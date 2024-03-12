const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Category = require("../models/Category");

// .../categories

// GET /categories - Get all categories for a user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    // Find all categories for the given user ID
    const categories = await Category.find({ userID: userId });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const newCategory = {
    categoryName: req.body.categoryName,
    userID: req.body.userId,
  };

  try {
    await Category.create(newCategory);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Need id that i want to delete
router.delete("/:id", async (req, res) => {
  const givenID = req.params.id;
  await Category.findByIdAndDelete(givenID);
  res.send(`category with id ${givenID} was deleted`);
});

module.exports = router;
