const School = require('../../../../models/school/School')

module.exports = (req, res) => {
  console.log("here");
  if (!req.body || !req.body.adminName || !req.body.password) {
    req.session.error = "missing information";
    return res.redirect('/auth/school/login');
  }

  School.findSchool(req.body.adminName, req.body.password, (err, school) => {
    if (err || !school) {
      req.session.error = "not found";
      return res.redirect('/auth/school/login');
    }

    if (school.verified) {
      req.session.school = school;
      if (req.session.redirect)
        return res.redirect(req.session.redirect);
      else 
        return res.redirect('/school/dashboard');
    } else {
      req.session.school = school;
      return res.redirect('/auth/school/verify');
    }
  });
}
