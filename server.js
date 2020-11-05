const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit:"10mb",extended:false}));

if(process.env.NODE_ENV !=="production"){
    // be loadoljuk az env variablet az .env filebol
      require('dotenv').config();
  }


// set the VIEW engine
app.set("view engine","ejs");
// honnan jonnek a VIEW -ok - current directoryn belol a views mappaban
app.set("views",__dirname+'/views');
// hook app express layouts beginning html ending html header footer - hol lesznek a layout fileok
// minden file ezekbe a layoutfileokba kerul hogy ne keljen duplikalni a header footert pl
app.set("layout","layouts/layout");

app.use(expressLayouts);
// public files - style images javascript (public views)
app.use(express.static('public'))

// mongo db----------------------------------------------------------
const mongoose = require("mongoose");
// setting up the connection with the database
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
// log if we are connected with our database
db.once("open",()=>{
    console.log("connected to mongoose");
})
db.on("error",(error)=>{
    console.log(error);
})
// ----------------------------------------------------------------------


// index router
const indexRouter = require("./routes/index");
// 1.index router/controller---------------------------
app.use('/',indexRouter);

// author router
const authorRouter = require("./routes/author");
app.use('/authors',authorRouter);

// env variablebol huzza ki ahova deployoljuk 
// a server fogja megmondani melyik porton halgatunk nem mi fontsuk el
app.listen(process.env.PORT || 3000);
