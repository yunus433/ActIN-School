const School = require('../../../models/school/School');

module.exports = (req, res) => {
  School.find({}, (err, schools) => {
    if (err) return res.redirect('/');

    if (req.session.error) {
      const err = req.session.error;
      req.session.destroy();
      res.render('auth/register', {
        page: 'auth/register',
        title: 'Üye ol',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        err,
        schools
      });
    } else
      res.render('auth/register', {
        page: 'auth/register',
        title: 'Üye ol',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        schools
      });
  });
}
