module.exports = function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.email)) {
    return res.redirect('/user/login');
  }
  next();
}