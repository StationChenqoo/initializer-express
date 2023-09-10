var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const timeMiddleware = require("./middleware/timeMiddleware");
var indexRouter = require("./routes/index");
var demoRouter = require("./routes/demo");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(timeMiddleware);
app.use(express.static(path.join(__dirname, "public")));

// Custom routes
app.use("/", indexRouter);
app.use("/demo", demoRouter);

/** 404 */
app.use(function (request, response, next) {
  next(createError(404));
});

app.use(function (error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  response.status(error.status || 500);
  response.render("error");
});

module.exports = app;
