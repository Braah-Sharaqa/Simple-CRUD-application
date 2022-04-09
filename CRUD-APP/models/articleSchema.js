const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const blogSchema = new Schema({
  name: String,
  quotes: String,
});
// model of schema
const Blog = mongoose.model("Blog", blogSchema);

// export the model
module.exports = Blog;
