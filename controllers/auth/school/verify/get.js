module.exports = (req, res, next) => {
  res.render('auth/school/verify', {
    page: 'auth/school/verify',
    title: 'Onay Sayfası',
    includes: {
      external: ['css', 'js', 'fontawesome']
    }
  });
}
