const {Schema} = require('mongoose');
const {ObjectId} = Schema;
const Object = require('./object');

let User = new Schema({
  id: ObjectId,
  username: {type: String, default: 'noname'},
  balance: {type: Number, default: 0},
  image: {type: String, default: ''},
  history: [{
    object_id: { type: Schema.Types.ObjectId, ref: 'Object' },
    message: {type: String, default: ''}
  }]
});

module.exports = User;
