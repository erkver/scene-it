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
{ strat, getUser, logout } = require('./ctrl/authCtrl'),
{ getMovies, getScreening } = require('./ctrl/userCtrl');

app.use(json());
massive(CONNECTION_STRING).then(db => {
  // console.log(db);
  app.set("db", db);
}).catch(err => console.log(err));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);


passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/login', passport.authenticate('auth0', {
  successRedirect: '/api/me',
  failureRedirect: '/login'
  // connection: 'github',
}));

//Auth endpoints
app.get('/api/me', getUser);
app.post('/logout', logout);

//User endpoints
app.get('/api/movies', getMovies);
app.get('/api/screening/:id', getScreening);

app.listen(port, () => console.log(`Server is listening on port ${port}`));