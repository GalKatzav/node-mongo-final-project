const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

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
      const token = jwt.sign({ name: user.name }, "123");
      res.json({ token });
    } else res.status(401).send("not allowed");
  } catch {
    res.status(500).send("server error");
  }
});

// Need only the token when the user login
router.post("/whoami", async (req, res) => {
  const token = req.body.token;
  const user = jwt.verify(token, "123");
  res.send(user.name);
});

// Need id that i want to delete
router.delete("/:id", async (req, res) => {
  const givenID = req.params.id;
  await User.findByIdAndDelete(givenID);
  res.send(`user with id ${givenID} was deleted`);
});

router.patch("/update-user", async (req, res) => {
  try {
    const { token, name } = req.body;

    if (!token) {
      return res.status(400).send("Token is required");
    }

    const user = jwt.verify(token, "123");

    if (!user) {
      return res.status(401).send("Invalid token");
    }

    // Apply updates to the user object
    if (name) {
      user.name = name;
    }
    console.log(user.name);

    // Send back the updated user object in the response
    res.json(user);
  } catch (error) {
    console.error("Error in PATCH /update-user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

// token name galk1 pass galk1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FsIGsxIiwiaWF0IjoxNzEwMjQ3MzQ5fQ.j65qMMDsShcygjhYzZedApzuldtwEZkEM_bBkPfcn_U

/*
// {
//     "email": "galTheQueen@gmail.com",
//     "password": "galTheQueen"
// }

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FsVGhlUXVlZW4iLCJpYXQiOjE3MTAyNDgxNjR9.lhUx_uiXVtC2ZyzFEd6Zb2-D3eMwE3LpFxpAcudZToM",
//     "name": "galUpd"
// }
*/
