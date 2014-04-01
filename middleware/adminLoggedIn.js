module.exports = function isLoggedIn (req, res, next) {
  if (!(req.session && (req.session.email == 'admin@homegefest.ru'))) {
    return res.redirect('/user/login');
  }
  next();
}