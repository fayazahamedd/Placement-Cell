const express = require("express");
const app = express();
const db = require("./config/mongoose.js");
const expressLayouts = require("express-ejs-layouts");
const port = 5000;
const flash = require("connect-flash");

//CSV Downloader
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const customMiddleware = require("./config/middelware");

const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Setting Notification popup using flash
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
  })
);

app.use(flash());
app.use(customMiddleware.setFlash);

//routing to the required files
app.use("/", require("./routes"));

//Setting Local Port
app.listen(port, (err) => {
  if (err) {
    console.log("Some error  - " + err);
  }
  console.log(`Server is running on port: ${port}`);
});
