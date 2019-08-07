const express = require("express");
const mongoose = require("mongoose");

// import routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

// express object
const app = express();

// db config
const db = require("./config/keys").mongoURI;

// connect to mongo db
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// api
app.get("/", (req, res) => res.send("Hello!"));

// set different routes
app.use("/api/users", users);
app.use("/api/profile", profiles);
app.use("/api/posts", posts);

// port from evn or default
const port = process.env.PORT || 5000;

// listener
app.listen(port, () => console.log(`Server is running on port ${port}`));
