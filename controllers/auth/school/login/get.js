module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/school/login', {
      page: 'auth/school/login',
      title: 'Okul Girişi',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      err
    });
  } else
    res.render('auth/school/login', {
      page: 'auth/school/login',
      title: 'Okul Girişi',
      includes: {
        external: ['css', 'js', 'fontawesome']
      }
    });
}
