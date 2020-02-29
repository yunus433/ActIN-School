const School = require('../../../models/school/School');

module.exports = (req, res, next) => {
  School.findUser(req.body.email, req.body.password, (err, school) => {
    if (err || !school) {
      req.session.error = "not found";
      return res.redirect('/auth/login');
    }

    req.session.school = school;
    return res.redirect('/school');
  });
}
