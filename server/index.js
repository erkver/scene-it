require ('dotenv').config();

const { SECRET, CONNECTION_STRING, REACT_APP_HOME } = process.env;
const express = require('express'),
session = require('express-session'),
passport = require('passport'),
app = express(),
port = process.env.PORT || 3001,
massive = require('massive'),
{ json } = require('body-parser'),
{ strat, getUser, logout } = require('./ctrl/authCtrl'),
{ getScreenings, getScreening } = require('./ctrl/userCtrl');

app.use(json());
massive(CONNECTION_STRING).then(db => {
  // console.log(db);
  app.set("db", db);
}).catch(err => console.log(err));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Auth functionality
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);


passport.serializeUser((user, done) => {
  console.log(user);
  const db = app.get('db');
  db.getUserByAuthid([user.id]).then(response => {
    if(!response[0]){
      db.addUserByAuthid([user.displayName, user.id, user.emails[0].value, user.picture, user.gender]).then(res => done(null, res[0])).catch(console.log);
    } else return done(null, response[0]);
  }).catch(console.log)
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/login', passport.authenticate('auth0', {
  successRedirect: REACT_APP_HOME,
  failureRedirect: '/login'
}));

//Auth endpoints
app.get('/api/me', getUser);
app.post('/logout', logout);

//User endpoints
app.get('/api/screenings', getScreenings);
app.get('/api/screening/:id', getScreening);

app.listen(port, () => console.log(`Server is listening on port ${port}`));