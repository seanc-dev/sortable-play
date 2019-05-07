const   express = require('express'),
        dotenv  = require("dotenv");

dotenv.config();

const   app     = express();

// config
app.use(express.static(__dirname + '/public/'));
app.set("view engine", "ejs");

// route
app.get("/", function(req, res){
    res.render("play")
});

app.listen(process.env.PORT, process.env.IP, () => console.log("Sortable Research running on port " + process.env.PORT + "!"));