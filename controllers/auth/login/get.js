module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Giriş',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      err,
      backgroundImage: 2
    });
  } else
    res.render('auth/login', {
      page: 'auth/login',
      title: 'Giriş',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      backgroundImage: 2
    });
}
