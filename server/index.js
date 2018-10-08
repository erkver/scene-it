require ('dotenv').config();

const {
  SECRET,
  CONNECTION_STRING
} = process.env;
const express = require('express'),
session = require('express-session'),
passport = require('passport'),
app = express(),
port = process.env.PORT || 3001,
massive = require('massive'),
{ json } = require('body-parser'),
strategy = require('./strategy'),
{ getMovies, getScreening } = require('./ctrl/userCtrl');

app.use(json());
// massive(CONNECTION_STRING).then(db => {
//   app.set("db", db);
// }).catch(err => console.log(err));

// app.use(
//   session({
//     secret: SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(strategy);


// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.get('/login', passport.authenticate('auth0', {
//   successRedirect: '/movies',
//   failureRedirect: '/login',
//   connection: 'github',
// }));

// function authenticated(req, res, next) {
//   if (!req.user) {
//     res.sendStatus(401);
//   } else {
//     next();
//   }
// }

// app.get('/movies', authenticated, (req, res) => {
//   res.status(200).send(req.user);
// });

app.get('/api/movies', getMovies);
app.get('/api/screening/:id', getScreening);

app.listen(port, () => console.log(`Server is listening on port ${port}`));