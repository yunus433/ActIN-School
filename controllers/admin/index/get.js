module.exports = (req, res) => {
  res.render('admin/dashboard', {
    page: 'admin/dashboard',
    title: 'Admin Ana Sayfa',
    includes: {
      external: ["css", "admin", "js", "fontawesome"]
    }
  });
};
