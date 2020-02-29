const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  adminName: {
    type: String,
    required: true
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  applications: {
    type: Array,
    default: []
  },
  users: {
    type: Array,
    default: []
  }
});

SchoolSchema.pre('save', hashPassword);

SchoolSchema.statics.findUser = function (adminName, password, callback) {
  let User = this;

  User.findOne({adminName}).then(user => { 
    if (!user)
        return callback(true);

    verifyPassword(password, user.adminPassword, (res) => {
      if (res) return callback(null, user);
      
      return callback(true);
    });
  });
};

module.exports = mongoose.model('School', SchoolSchema);
