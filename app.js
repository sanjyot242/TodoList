const express = require("express");
const bodyParser = require("body-parser");
const Date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todoListDB");

const itemsSchema = {
  name: {
    type: String,
    required: true,
  },
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your To-Do List",
});
const item2 = new Item({
  name: "Hit + to add a new Item",
});
const item3 = new Item({
  name: "Click check-box to delete Item",
});

// const items = ["Take an appointment at Kapils", "Service scooty", "Go have a haircut"];
// const workItems = [];

app.get("/", function (req, res) {
  currentDay = Date.getDate();
  Item.find({}, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      if (items.length === 0) {
        Item.insertMany([item1, item2, item3], function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Success");
            res.redirect("/");
          }
        });
      } else {
        res.render("list", { listTitle: currentDay, items: items });
      }
    }
  });
});

app.post("/", function (req, res) {
  item = req.body.addedTask;
  const newItem = new Item({
    name: item,
  });
  newItem.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/delete", function (req, res) {
  let id = req.body.checkbox.trim();
  console.log(id);
  Item.findByIdAndRemove(id, function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.get("/work", function (res, res) {
  res.render("list", { listTitle: "Work List", items: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is up and running on port 3000");
});
