const bcrypt = require("bcrypt");

module.exports = function(next) {
  let school = this;

  if (school.isModified("adminPassword")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(school.adminPassword, salt, (err, hash) => {
        school.adminPassword = hash;
        next();
      });
    });
  } else {
    next();
  }
};
