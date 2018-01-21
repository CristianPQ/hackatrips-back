const mongoose = require('mongoose');
const ObjectSchema = require('./object');
const UserSchema = require('./user');

//mLab
// mongoose.connect('mongodb://test:password@ds211088.mlab.com:11088/hackatrips2018');

// Oracle
mongoose.connect('mongodb://test:password@129.158.75.223:27017/hackatrips');

let Object = mongoose.model('Object', ObjectSchema);
let User = mongoose.model('User', UserSchema);

module.exports = {
  mongoose,
  Object,
  User
};