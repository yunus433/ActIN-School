module.exports = (req, res, next) => {
  if (req.session.error) {
    const err = req.session.error;
    req.session.destroy();
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Üye ol',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      err
    });
  } else
    res.render('auth/register', {
      page: 'auth/register',
      title: 'Üye ol',
      includes: {
        external: ['css', 'js', 'fontawesome']
      }
    });
}
