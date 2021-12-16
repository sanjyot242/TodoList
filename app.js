const express = require("express")
const bodyParser = require("body-parser")
const Date = require(__dirname + "/date.js")

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

const items = ["Take an appointment at Kapils", "Service scooty", "Go have a haircut"];
const workItems = [];

app.get("/", function (req, res) {
    currentDay = Date.getDate();
    res.render('list', { listTitle: currentDay, items: items })
})

app.post("/", function (req, res) {

    console.log(req.body)
    item = req.body.addedTask;
    if (req.body.button === "Work List") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function (res, res) {
    res.render("list", { listTitle: "Work List", items: workItems })
})


app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server is up and running on port 3000")
})