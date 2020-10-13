var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static('./'));

app.use(session({
    secret: 'justasecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000*60*60*2   // 2 hours
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(app, passport);
require('./app/routes.js')(app, passport);
app.listen(8000, ()=>{
    console.log("Server listen at port 8000")
});