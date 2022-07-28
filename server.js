const express = require("express");

require("dotenv").config();

const oauthServer = require('./auth/server.js');
const clientDB = require("./db/memory/client-db.js");



const port = process.env.PORT || 3000;

const app = express();

app.oauthServer = oauthServer;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authController = require("./controllers/auth")(clientDB);
const usersController = require("./controllers/users");
const routesAuth = require("./routers/auth")(express.Router(), app, authController);
const usersRouter = require("./routers/users")(express.Router(), app, usersController);

app.use("/auth", routesAuth);
app.use("/users", usersRouter);

// app.use(oauthServer.errorHandler());

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: 'error server'
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
