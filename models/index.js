// Purpose: exporting the User and Thought models to be used in the server.js
const User = require("./User.js");
const Thought = require("./Thought.js");

// export the User and Thought models
module.exports = { User, Thought };
