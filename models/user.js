const {Schema} = require('mongoose');
const {ObjectId} = Schema;


let User = new Schema({
  id: ObjectId,
  username: {type: String, default: 'noname'},
  balance: {type: Number, default: 0},
  image: {type: String, default: ''},
  history: [{
    object_id: String,
    message: {type: String, default: ''}
  }]
});

module.exports = User;
