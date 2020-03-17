module.exports = (req, res) => {
  return res.render('user/dashboard', {
    page: 'user/dashboard',
    title: 'Ana Sayfa',
    includes: {
      external: ['js', 'css', 'fontawesome']
    },
    user: req.session.user
  });
}
