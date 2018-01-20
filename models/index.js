const mongoose = require('mongoose');
const ObjectSchema = require('./object');
const UserSchema = require('./user');

mongoose.connect('mongodb://test:password@ds211088.mlab.com:11088/hackatrips2018');
// mongoose.connect('mongodb://test:password@ds211088.mlab.com:11088/testtest');

let Object = mongoose.model('Object', ObjectSchema);
let User = mongoose.model('User', UserSchema);

module.exports = {
  mongoose,
  Object,
  User
};