const mongoose = require('mongoose');

const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.findById(mongoose.Types.ObjectId(req.session.school._id), (err, school) => {
    if (err) return res.redirect('/');

    return res.render('school/students', {
      page: 'school/students',
      title: 'Kayıtlı Öğrenciler',
      includes: {
        external: ["css", "console", "school", "js", "fontawesome"]
      },
      school
    });
  });
}
