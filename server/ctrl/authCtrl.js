const Auth0Strategy = require("passport-auth0");

const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

const strat = new Auth0Strategy(
  {
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "/login",
    scope: "openid email profile"
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

const getUser = (req, res) => {
  if(req.user) res.status(200).json(req.user);
  else res.status(403).json({message: "Not Logged In"});
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('http://localhost:3000')
  });
};

module.exports = {
  strat,
  getUser,
  logout
};
