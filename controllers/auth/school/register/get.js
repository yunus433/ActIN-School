module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/school/register', {
      page: 'auth/school/register',
      title: 'Yeni Okul Kaydı',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      err
    });
  } else
    res.render('auth/school/register', {
      page: 'auth/school/register',
      title: 'Yeni Okul Kaydı',
      includes: {
        external: ['css', 'js', 'fontawesome']
      }
    });
}
