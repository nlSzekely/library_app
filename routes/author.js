const e = require("express");
const express = require("express");
const router = express.Router();
const Author = require("../models/author");



// all the authors
router.get('/', async(req, res) => {
    let searchOptions = {};
    if(req.query.authorName !== null && req.query.authorName !==""){
        searchOptions.name = new RegExp(req.query.authorName,"i")
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render("author/index",{authors:authors, searchOptions: req.query})
    }catch{
        res.redirect("/")
    }
})

// author form
// New author route - for displaying the form
router.get("/new",  (req, res) => {
    res.render("author/new", { author: new Author() });    // ezzel kuldjuk le az ejs fileunkban az Author tablat nem csinal uj autorth csak hasznalhatjuk a CRUD ot
})

// create new author

router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.authorName
    })
    try {
        const newAuthor = await author.save();
        res.redirect("/authors")
    } catch {
        res.render("author/new", {
            author: author,
            errorMessage: "Error creating author"
        })
    }
})

module.exports = router;