var path = require("path");
const fs = require("fs");



module.exports = function (app) {

    fs.readFile("./db/db.json", "utf-8", function (error, data) {
        if (error) throw error;
        notes = JSON.parse(data)
    })

    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function (req, res) {
        let newNotes = req.body;

        newNote(newNotes);

        console.log(newNotes);

        res.json(newNotes);

    });

    app.get("/api/notes/:id", function (req, res) {
        res.json(notes[req.params.id]);
    })

    app.delete('/api/notes/:id', function (req, res) {
        const id = req.params.id;
        deleteNote(id);
        console.log(req.params.id); // should display 123
        res.json(id);
    });

}

function newNote(note) {
    fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let databaseObject = JSON.parse(data); //now it an object
            let maxId = Math.max.apply(Math, databaseObject.map(function (o) { return o.id; }))
            note["id"] = maxId + 1;
            databaseObject.push(note); //add some data
            databaseString = JSON.stringify(databaseObject); //convert it back to json
            fs.writeFile('./db/db.json', databaseString, 'utf8', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                }
            });
        }
    });
}

function deleteNote(id) {
    fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let databaseObject = JSON.parse(data); //now it an object
            databaseObject = databaseObject.filter(x => x.id != id)
            databaseString = JSON.stringify(databaseObject); //convert it back to json
            fs.writeFile('./db/db.json', databaseString, 'utf8', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                }
            });
        }
    });

} 