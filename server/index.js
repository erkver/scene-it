require('dotenv').config();

const { SECRET, REACT_APP_HOME } = process.env;
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 3001;
const massive = require("massive");
const { json } = require("body-parser");

const { strat, getUser, logout } = require("./ctrl/authCtrl");
const { getMovies, getMovie, getAllUsers } = require("./ctrl/adminCtrl.js");

const {
  getScreenings,
  getScreening,
  getScreeningInfo,
  createScreening,
  editScreening
} = require("./ctrl/screeningCtrl");

const { getTheatres, getTheatre } = require("./ctrl/theatreCtrl");
const { getFavorites, addFavorite, deleteFavorite } = require('./ctrl/favoritesCtrl');

const {
  getReports,
  getReport,
  addReport,
  editReport,
  deleteReport,
} = require('./ctrl/reportCtrl');

const {
  getScenes,
  getScene,
  addScene,
  editScene,
  deleteScene
} = require('./ctrl/sceneCtrl');

const {
  getPressComments,
  getPressComment,
  addPressComment,
  editPressComment,
  deletePressComment
} = require('./ctrl/pressCommentCtrl');

const {
  getAudComments,
  getAudComment,
  addAudComment,
  editAudComment,
  deleteAudComment
} = require('./ctrl/audCommentCtrl')

app.use(json());
massive(process.env.CONNECTION_STRING).then(db => app.set("db", db)).catch(err => console.log(err));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000
    }
  })
);

//Auth functionality
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  // console.log(user);
  const db = app.get('db');
  db.getUserByAuthid([user.id]).then(response => {
    // console.log(response);
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
app.get('/logout', logout);

//Admin endpoints
app.get('/api/movies', getMovies);
app.get('/api/movie/:id', getMovie);
app.get('/api/data', getAllUsers);

//Screening endpoints
app.get('/api/screenings', getScreenings);
app.get('/api/screening/:id', getScreening);
app.get('/api/screeningInfo/:id', getScreeningInfo);
app.post("/api/screening", createScreening);
app.put('/api/screening/:id', editScreening);

//Theatre endpoints
app.get("/api/theatres", getTheatres);
app.get("/api/theatres/:id", getTheatre);

//Favorites endpoints
app.get("/api/favorites", getFavorites);
app.post("/api/favorite", addFavorite);
app.delete("/api/favorite/:id", deleteFavorite);

//Report endpoints
app.get('/api/reports', getReports);
app.get('/api/report/:id', getReport);
app.post('/api/report', addReport);
app.put("/api/report/:id", editReport);
app.delete("/api/report/:id", deleteReport);

//Scene endpoints
app.get("/api/scenes", getScenes);
app.get('/api/scene/:id', getScene);
app.post('/api/scene', addScene);
app.put('/api/scene/:id', editScene);
app.delete('/api/scene/:id', deleteScene);

//PressComm endpoints
app.get('/api/comments/press', getPressComments);
app.get('/api/comment/press/:id', getPressComment);
app.post('/api/comment/press', addPressComment);
app.put("/api/comment/press/:id", editPressComment);
app.delete("/api/comment/press/:id", deletePressComment);

//AudComm endpoints
app.get('/api/comments/audience', getAudComments);
app.get('/api/comment/audience/:id', getAudComment);
app.post('/api/comment/audience', addAudComment);
app.put("/api/comment/audience/:id", editAudComment);
app.delete("/api/comment/audience/:id", deleteAudComment);


app.listen(port, () => console.log(`Server is listening on port ${port}`));