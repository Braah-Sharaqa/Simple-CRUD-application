const express = require("express");
const app = express();
const Blog = require("./models/articleSchema");
app.use(express.static("public"));
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//mongoose
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true })); // when make post method
app.set("view engine", "ejs");
const port = 3000;
// connect to DB
mongoose
  .connect(
    "mongodb+srv://baraah:baraah@cluster0.hnvwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log("connected to BD ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/all-quotes");
});

// to post data in to DB
app.post("/all-quotes", (req, res) => {
  const quotes = new Blog(req.body);

  console.log(req.body);
  quotes
    .save()
    .then((result) => {
      res.redirect("/all-quotes");
    })
    .catch((err) => {
      console.log(err);
    });
});
// to show tha data
app.get("/all-quotes", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { Arrayquotes: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//
app.put("/all-quotes", (req, res) => {
  Blog.findOneAndUpdate(
    { name: "Yoda" },
    {
      $set: {
        name: req.body.name,
        quotes: req.body.quotes,
      },
    },
    {
      upsert: true,
    }
  )
    .then((result) => {
      res.json("Success");
    })
    .catch((error) => console.error(error));
});

app.delete("/all-quotes", (req, res) => {
  // Handle delete event here
  Blog.deleteOne({ name: req.body.name })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No quote to delete");
      }

      res.json(`Deleted Darth Vadar's quote`);
    })
    .catch((error) => console.error(error));
});
