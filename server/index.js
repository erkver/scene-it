require('dotenv').config();
const {
  SECRET,
  CONNECTION_STRING,
  REACT_APP_HOME,
  USER,
  PASS,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
} = process.env;
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = 3001;
const massive = require('massive');
const { json } = require('body-parser');
const nodemailer = require('nodemailer');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const { strat, getUser, logout } = require('./ctrl/authCtrl');
const { getMovies, getMovie, getAllUsers } = require('./ctrl/adminCtrl.js');

const {
  getScreenings,
  getScreening,
  getScreeningInfo,
  createScreening,
  editScreening
} = require('./ctrl/screeningCtrl');

const { getTheatres, getTheatre } = require('./ctrl/theatreCtrl');
const {
  getFavorites,
  addFavorite,
  deleteFavorite
} = require('./ctrl/favoritesCtrl');

const {
  getReports,
  getReport,
  addReport,
  editReport,
  deleteReport
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
} = require('./ctrl/audCommentCtrl');

app.use(json());

massive(CONNECTION_STRING)
  .then(db => app.set('db', db))
  .catch(err => console.log(err));

app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000000
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
  db.getUserByAuthid([user.id])
    .then(response => {
      // console.log(response);
      if (!response[0]) {
        db.addUserByAuthid([
          user.displayName,
          user.id,
          user.emails[0].value,
          user.picture,
          user.gender
        ])
          .then(res => done(null, res[0]))
          .catch(console.log);
      } else return done(null, response[0]);
    })
    .catch(console.log);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: REACT_APP_HOME,
    failureRedirect: '/login'
  })
);

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
app.post('/api/screening', createScreening);
app.put('/api/screening/:id', editScreening);

//Theatre endpoints
app.get('/api/theatres', getTheatres);
app.get('/api/theatres/:id', getTheatre);

//Favorites endpoints
app.get('/api/favorites', getFavorites);
app.post('/api/favorite', addFavorite);
app.delete('/api/favorite/:id', deleteFavorite);

//Report endpoints
app.get('/api/reports', getReports);
app.get('/api/report/:id', getReport);
app.post('/api/report', addReport);
app.put('/api/report/:id', editReport);
app.delete('/api/report/:id', deleteReport);

//Scene endpoints
app.get('/api/scenes', getScenes);
app.get('/api/scene/:id', getScene);
app.post('/api/scene', addScene);
app.put('/api/scene/:id', editScene);
app.delete('/api/scene/:id', deleteScene);

//PressComm endpoints
app.get('/api/comments/press', getPressComments);
app.get('/api/comment/press/:id', getPressComment);
app.post('/api/comment/press', addPressComment);
app.put('/api/comment/press/:id', editPressComment);
app.delete('/api/comment/press/:id', deletePressComment);

//AudComm endpoints
app.get('/api/comments/audience', getAudComments);
app.get('/api/comment/audience/:id', getAudComment);
app.post('/api/comment/audience', addAudComment);
app.put('/api/comment/audience/:id', editAudComment);
app.delete('/api/comment/audience/:id', deleteAudComment);

//Nodemailer
app.post('/send', (req, res) => {
  const output = `<p>${req.body.message}</p>`;
  const emails = req.body.users;
  const subject = req.body.subject;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: USER,
      pass: PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  emails.forEach((user, i, array) => {
    let mailOptions = {
      from: `SceneItTeam <${USER}>`,
      to: 'erkver250@gmail.com',
      text: 'Hello world?',
      html: output
    };
    mailOptions.cc = user;
    mailOptions.subject = subject;
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(mailOptions);
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send email' });
      } else if (i === emails.length - 1) {
        emails.tansport.close();
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
  return res.status(200).json('Success');
});

//Twilio
app.post('/api/messages', (req, res) => {
  console.log(req.body);
  res.header('Content-type', 'applcation/json');
  client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
