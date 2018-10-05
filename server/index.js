require ('dotenv').config();

const {
  SECRET: secret,
  DOMAIN: domain,
  CLIENT_ID: clientID,
  CLIENT_SECRET: clientSecret,
  CONNECTION_STRING
} = process.env;
const express = require('express'),
session = require('express-session'),
passport = require('passport'),
AuthStrategy = require('passport-auth0'),
app = express(),
port = process.env.PORT || 3001,
massive = require('massive'),
{ json } = require('body-parser');
app.use(json());



app.listen(port, () => console.log(`Server is listening on port ${port}`));