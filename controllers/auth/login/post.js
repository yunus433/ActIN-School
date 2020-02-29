const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findUser(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      req.session.error = "not found";
      return res.redirect('/auth/login');
    }

    req.session.user = user;
    return res.redirect('/discover');
  });
}
