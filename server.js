const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const engine = require("ejs-mate");
const session = require("express-session");
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const app = express();

mongoose.connect('mongodb://localhost/rateme')
app.use(express.static("public"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret:'Thisismysecretkey',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get('/test', (req,res,next)=>{
    res.render('test')
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
