const express = require("express");
const router = express.Router();

// all the authors
router.get('/', (req, res) => {
    res.render("author/index")
})

// author form
router.get('/new', (req, res) => {
    res.render("author/new")
})

// create new author

router.post('/', (req, res) => {
    if(req.method === "POST"){
        res.send("Created")
    }
})

module.exports = router;