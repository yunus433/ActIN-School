const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.find({
    "verified": false
  }, (err, schools) => {
    if (err) return res.redirect('/admin');

    res.render('admin/applications', {
      page: 'admin/applications',
      title: 'Okul Başvuruları',
      includes: {
        external: ["css", "admin", "js", "fontawesome"]
      },
      schools
    });
  });
};
