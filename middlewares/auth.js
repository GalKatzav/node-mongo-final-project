// This middleware function is responsible for authenticating incoming requests using JWT tokens and attaching
// the authenticated user's data to the request object for further processing.
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(400).send("no authorization header");
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(400).send("no token");
    return;
  }

  try {
    const data = jwt.verify(token, "123");
    req.user = data;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send("bad token");
  }
}

module.exports = auth;
