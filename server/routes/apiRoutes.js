const db = require("./../db/models")

module.exports = (app) => {
  
  // Post Recipe Route
  });
  app.post("/api/saved", function(req, res) {
    db.Recipe
    .create(req.body)
    .then(function(savedRecipe){
      return db.User.findOneAndUpdate({ _id: req.user._id}, 
        {
          $push: {recipes: savedRecipe._id}
        }, { new: true  });
    }).then(function(updatedUser){
      console.log("MADE IT HERE!");
      return db.User
      .findOne({_id: updatedUser._id})
      .populate("recipes");
    }).then(function(populatedUser){
      console.log("MADE IT HERE1!");
      console.log(populatedUser);
      res.json(populatedUser);
    });
  });
  // Route to get User's added repice populate on page
  app.get("/populateduser", function(req, res) {
    // Find all users
    db.User
      .findById()
      // Specify that we want to populate the retrieved users with any associated notes
      .populate("recipes")
      .then(function(dbUser) {
        // If able to successfully find and associate all Users and Notes, send them back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  // Get Recipe Route
  app.get("/api/recipe", function(req, res) {
    console.log("inside of 'api/recipe'");
    db.Recipe.find({})
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.json(doc);
        }
      });
};