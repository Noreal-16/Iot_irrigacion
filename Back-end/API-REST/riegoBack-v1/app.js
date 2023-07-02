const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');
const mqttServer = require('./Controller/ServerSuscriptorController')
const swaggerSetup = require('./swagger');
//midleware
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

global.isSuper_Admin = false;
global.isAdmin = false;

const result = dotenv.config();
if (result.error) {
  throw result.error;
} else {
  console.log("dotenv");
}
var mongodbStorage = require("connect-mongodb-session")(session);
let dev_url_db = process.env.MONGODB_URI || "mongodb://localhost/mqttriego";
mongoose.connect(dev_url_db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
}, function(error){
  if (error) {
    console.error(error);
    throw error;
  } else {
    console.log("Conection to DB success");
  }
});
mongoose.Promise = global.Promise;
let db= mongoose.connection;
db.on('error', console.error.bind(console, "Error de conexion a mongo"));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const topicRouter = require('./routes/topic');
const topicActuadorRouter = require('./routes/topicActuador');
const topicSensorData = require('./routes/sensores');
const soilRouter = require('./routes/soil');

global.isSuper_Admin = false;
global.isAdmin = false;

const app = express();
swaggerSetup(app);

require('./config/passport/passport.js')(passport);
const store = new mongodbStorage({
  uri: dev_url_db,
  collection: "dbSessiones",
});


store.on("error", function (error) {
  console.error("error Store", error);
});

app.use(bodyParser.json({
  limit:'50mb',
}));
app.use(bodyParser.urlencoded({
  limit:'50mb',
  extended: false
}));


app.use(cookieParser());
app.use(cookieSession({
  nameU:"session",
  keys:['userRiedo_sid'],
  maxAge:14*24*3600000
}));
app.use(session({
  key:'userRiedo_sid',
  secret:'123gfdsaxcvbnm,qwertyu8765!"$%&/bvcxerty',
  store:store,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:14*24*3600000
  },
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
const options = {
  origin:['http://localhost:9000','http://134.122.19.64']
}
app.use(cors({
  origin: options,
  credentials: true
}));
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/topic', topicRouter);
app.use('/topicActuador', topicActuadorRouter);
app.use('/sensors', topicSensorData);
app.use('/soils', soilRouter);

/**
 * MQTT Server
 */
const mqttClient = new mqttServer();
mqttClient.connect();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
