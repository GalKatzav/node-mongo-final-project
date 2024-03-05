const mongoose = require("mongoose");

const uri = `mongodb://localhost:27017`;
const dbName = "finalProject";

function connect() {
  mongoose.connect(uri, {
    dbName,
  });
}
function disconnect() {
  mongoose.connection.close();
}

module.exports = {
  connect,
  disconnect,
};
