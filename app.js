// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Create express app and set port
const app = express();
const PORT = 3002;

// Middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const dbPath = path.join(__dirname, "/db/db.json");

// HTML Routes
app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API Routes
app.get("/api/notes", function(req,res) {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
});

app.post("/api/notes", function(req,res) {
    //Generate unique ID
    let id = 1;
    const newNote = {"id": id, "title": req.body.title, "text": req.body.text};


    fs.appendFile(dbPath, newNote, function (err) {
        if (err) throw err;
        console.log('Note has been added to db!');
    });
});

app.delete("/api/notes/:id", function(req,res) {
    const removeId = req.param("id");

    const data = fs.readFile(dbPath);
    var json = JSON.parse(data);
    json = users.filter((user) => { return json.id !== removeId });
    fs.writeFileSync('results.json', JSON.stringify(json, null, 2));



});

// Set server to listen
app.listen(PORT, () => {
    console.log("App listening to port " + PORT)
});