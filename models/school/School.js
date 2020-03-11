const mongoose = require('mongoose');
const moment = require('moment-timezone');

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
  phone: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: "https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/actinschool/noPhotoSelected.png"
  },
  createdAt: {
    type: String,
    default: moment(Date.now()).tz("Europe/Istanbul").format("dddd, MMMM Do YYYY")
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
  },
  clubs: {
    type: Array,
    default: []
  },
  verified: {
    type: Boolean,
    default: false
  }
});

SchoolSchema.pre('save', hashPassword);

SchoolSchema.statics.findSchool = function (adminName, password, callback) {
  let School = this;

  School.findOne({adminName}).then(school => { 
    if (!school)
      return callback(true);

    verifyPassword(password, school.adminPassword, (res) => {
      if (res) return callback(null, school);
      
      return callback(true);
    });
  });
};

module.exports = mongoose.model('School', SchoolSchema);
