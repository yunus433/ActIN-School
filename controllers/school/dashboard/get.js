const mongoose = require('mongoose');

const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.findById(mongoose.Types.ObjectId(req.session.school._id), (err, school) => {
    if (err) return res.redirect('/');

    res.render('school/dashboard', {
      page: 'school/dashboard',
      title: 'Ana Sayfa',
      includes: {
        external: ['css', 'console', 'school', 'fontawesome']
      },
      school
    });
  });
}
