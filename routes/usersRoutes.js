const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const auth = require("../middlewares/auth");

// .../users

// Gets all the users from the DB
router.get("/", async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});

// Gets specific user from the DB by id
router.get("/:id", async (req, res) => {
  const givenID = req.params.id;
  const wantedUser = await User.findById(givenID);
  res.json(wantedUser);
});

// Create new user
router.post("/", async (req, res) => {
  try {
    const givenPass = req.body.password;
    const hashedPass = await bcrypt.hash(givenPass, 10);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    };

    await User.create(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Need to put the real pass and email
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("unknown email");

    const hashedSaltedPass = user.password;
    const givenPass = req.body.password;

    if (await bcrypt.compare(givenPass, hashedSaltedPass)) {
      const tokenData = {
        id: user._id,
        name: user.name,
      };

      const token = jwt.sign(tokenData, "123");
      res.json({ token });
    } else res.status(401).send("not allowed");
  } catch {
    res.status(500).send("server error");
  }
});

// Need only the token when the user login
router.post("/whoami", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  res.send(user.name);
});

// Need id that i want to delete
router.delete("/:id", async (req, res) => {
  const givenID = req.params.id;
  await User.findByIdAndDelete(givenID);
  res.send(`user with id ${givenID} was deleted`);
});

// can change the name of the object
router.patch("/", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { name: req.body.name });

    // Send back the updated user object in the response
    res.send("Change made");
  } catch (error) {
    console.error("Error in PATCH /update-user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
