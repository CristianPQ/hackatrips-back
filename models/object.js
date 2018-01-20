const {Schema} = require('mongoose');
const {ObjectId} = Schema;


let Object = new Schema({
  id: ObjectId,
  name: {type: String, default: 'noname'},
  description: {type: String, default: ''},
  location: [{
    type: {type: String, default: ''},
    name: String,
    poi_name: String,
    poi_id: String,
    coordinates: [Number, Number]
  }],
  balance: {type: Number, default: 0},
  available: {type: Boolean, default: false},
  history: [{
    user_id: String,
    username: String,
    image: String,
    story: String
  }]
});

/*
"description" : "Tabla Kite Dub Naish 2015. Es ideal para las olas de Marruecos",
  "image":"https://imgur.com/v0krLuZ",
  "location": {
  "type": "Point",
    "name": "Dakhla",
    "poi_name": "Hotel Western Sahara, Marruecos",
    "poi_id": "",
    "coordinates": [23.700141, -15.955252]
},
"log" : [
*/


  module.exports = Object;
