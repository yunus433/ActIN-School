const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  User.findUser(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      req.session.error = "not found";
      return res.redirect('/auth/login');
    }

    if (user.verified) {
      req.session.user = user;
      if (req.session.redirect)
        return res.redirect(req.session.redirect);
      else 
        return res.redirect('/dashboard');
    } else {
      req.session.user = user;
      return res.redirect('/auth/verify');
    }
  });
}
