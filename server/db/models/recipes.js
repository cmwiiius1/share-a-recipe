var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;