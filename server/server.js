// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080
const db = require("./db/models")
// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))
app.use('/member', require('./member'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
});

// require("./../routes/index")(app);

// temp============
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
      .findById(req.user._id)
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
    });
  app.delete("delete-recipe/:id", (req, res) => {
    console.log("inside delete recipe")
  db.Recipe
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});
// temp===========
// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
