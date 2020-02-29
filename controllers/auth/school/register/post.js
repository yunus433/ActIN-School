const School = require('../../../models/school/School');

const sendMail = require('../../../utils/sendMail');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.adminName || !req.body.adminPassword) {
    req.session.error = 'missing information';
    return res.redirect('/auth/school/register');
  }

  const newSchoolData = {
    name: req.body.name,
    email: req.body.email,
    adminName: req.body.adminName,
    adminPassword: req.body.adminPassword
  }

  const newSchool = new School(newSchoolData);

  newSchool.save((err, school) => {
    if (err && err.code == 11000) {
      req.session.error = 'already taken email';
      return res.redirect('/auth/school/register');
    }
    if (err) return res.redirect('/');

    
    sendMail({
      email: school.email,
      name: school.name
    }, 'schoolRegister', () => {
      req.session.notVerifiedSchool = school;

      return res.redirect('/auth/verify');
    });
  });
}
