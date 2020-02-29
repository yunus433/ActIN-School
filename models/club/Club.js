const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  schoolID: {
    type: String, 
    required: true
  },
  profilePhoto: {
    type: String,
    default: "https://res.cloudinary.com/dvnac86j8/image/upload/v1566558525/actinschool/defaultUserPicture.png"
  },
  users: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Club', ClubSchema);
