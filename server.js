const express = require("express");
var path = require("path");
var fs = require("fs");

const app = express();


var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./Routes/apiRoutes")(app)
require("./Routes/htmlRoutes")(app)


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





app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});