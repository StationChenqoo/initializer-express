var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const timeMiddleware = require("./middleware/timeMiddleware");
var indexRoute = require("./routes/index");
var demoRoute = require("./routes/demo");
var spiderRoute = require("./routes/spider");
var seriesRoute = require("./routes/series");
var teacherRoute = require("./routes/teacher");
var personRoute = require("./routes/person");
var searchRoute = require("./routes/search");

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
var routes = [
  { name: "/", value: indexRoute },
  { name: "/demo", value: demoRoute },
  { name: "/spider", value: spiderRoute },
  { name: "/series", value: seriesRoute },
  { name: "/teacher", value: teacherRoute },
  { name: "/person", value: personRoute },
  { name: "/search", value: searchRoute },
];
for (let i = 0; i < routes.length; i++) {
  app.use(routes[i].name, routes[i].value);
}

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
