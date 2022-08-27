const cookieParser = require("cookie-parser"),
  session = require("express-session"),
  createError = require("http-errors"),
  dbConnector = require("./helpers/dbConnector"),
  express = require("express"),
  app = express(),
  path = require("path"),
  cors = require("cors"),
  logger = require("morgan"),
  flash = require("connect-flash");

/* --------------------- setting up environmet varaibles -------------------- */
require("dotenv").config({ path: path.join("./.env") }, console.info);

// Connect To DataBase And Show Proper Messages
const db = dbConnector(
  `${process.env.DB_HOST}:${process.env.DB_PORT}`,
  process.env.DB_NAME
);

// Setting Up Admin
require("./helpers/initializer");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setting Session Up
app.use(
  session({
    key: "sid",
    secret: "Go Fuck Yourself",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use("*", cors({ origin: "http://localhost:3000" }));

// Clear Cookie If There Is No Session On Server And Giving User Info To Renders
app.use((req, res, next) => {
  if (!req.session.user && req.cookies.sid) {
    res.clearCookie("sid");
    return next();
  }
  res.locals.user = req.session.user;
  next();
});

// Setup Flash Messages For View Rendering
app.use((req, res, next) => {
  res.locals.flash = req.flash();
  next();
});

// Setup Routes
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("404");
});

module.exports = app;
