module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Ana Sayfa',
    includes: {
      external: ['css', 'fontawesome']
    },
    backgroundImage: 1
  });
}
