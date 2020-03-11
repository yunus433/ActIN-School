module.exports = (req, res, next) => {
  res.render('auth/verify', {
    page: 'auth/verify',
    title: 'Onay Sayfası',
    includes: {
      external: ['css', 'fontawesome']
    }
  });
}
