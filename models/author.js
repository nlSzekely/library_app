// library to connect to mongo db
const mongoose = require("mongoose");

// creating the schema non seqlual adatbazisok eseten ez olyan mint a table egy normal sql database eseten

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Author", authorSchema); // ez olyan minth a table nevink lenne sql adatbazis eseten