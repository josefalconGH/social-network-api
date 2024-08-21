// Purpose: connect to the database using mongoose
const { connect, connection } = require("mongoose");

connect("mongodb://127.0.0.1:27017/socialNetwork_db");

module.exports = connection;
