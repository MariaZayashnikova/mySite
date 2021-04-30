const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const config = require("./passDB");

const app = express();
const Parser = bodyParser.json();

const pool = mysql.createPool({
    connectionLimit: 5,
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}

app.use(allowCrossDomain);

app.get("/getWords", function (req, res) {
    pool.query("SELECT * FROM words", function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
});

app.get("/getComments", function (req, res) {
    pool.query("SELECT * FROM comments", function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
});

app.post("/postWord", Parser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const rus = req.body.rus;
    const en = req.body.en;
    const prompt = req.body.prompt;
    pool.query("INSERT INTO words(rus, en, prompt) VALUES (?,?,?)", [rus, en, prompt], function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
});

app.post("/postComment", Parser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const image = req.body.image;
    const author = req.body.author;
    const commentText = req.body.commentText;
    const dateComment = req.body.dateComment;

    let query = `INSERT comments (image, author, commentText, dateComment) VALUES ("${image}", "${author}", "${commentText}", "${dateComment}")`;

    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
});

app.post("/deleteWord", Parser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    pool.query("DELETE FROM words WHERE id = (?)", [id], function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
});

app.post("/changeWord", Parser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const id = +req.body.id;
    const language = req.body.language;
    const newWord = req.body.newValue;
    const query = `UPDATE words SET ${language} = "${newWord}"  WHERE id = ${id}`;
    pool.query(query, function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
});

app.listen(5000);


// первоначальное наполнение базы после перехода (проведено)
// let base = require('./database');
// base.comments.forEach(item => {
//     let query = `INSERT comments (image, author, commentText, dateComment) VALUES ("${item.image}", "${item.author}", "${item.commentText}", "${item.dateComment}")`;
//     pool.query(query, function (err, data) {
//         if (err) return console.log(err);
//     });
// });

// base.words.forEach(item => {
//     let query = `INSERT words (rus, en, prompt) VALUES ("${item.rus}", "${item.en}", "${item.prompt}")`;
//     pool.query(query, function (err, data) {
//         if (err) return console.log(err);
//     });
// });
