const Auth0Strategy = require('passport-auth0');

const { DOMAIN, CLIENT_ID, CLIENT_SECRET, REACT_APP_HOME } = process.env;

const strat = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/login',
    scope: 'openid email profile'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

const getUser = (req, res) => {
  if (req.user) {
    const { user_id, name, isadmin, email } = req.user;
    if (!req.session.user) {
      req.session.user = {
        user_id,
        name,
        isadmin,
        email
      };
    }
    res.status(200).json(req.session.user);
  } else {
    res.status(403).json({ message: 'Not Logged In' });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect(REACT_APP_HOME);
  });
};

module.exports = {
  strat,
  getUser,
  logout
};
