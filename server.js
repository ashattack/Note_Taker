const express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();


var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function newNote(note) {
    fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            obj.push(note); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('./db/db.json', json, 'utf8', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");


                }
            }); // write it back 
        }
    });

}

//Routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function (req, res) {

    var newNotes = req.body;

    newNote(newNotes);

    console.log(newNotes);

    res.json(newNotes);

});

app.delete('/api/notes/:id', function (req, res) {
    const id = req.params.id;
    console.log(id); // should display 123
    res.json(id);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});






app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});