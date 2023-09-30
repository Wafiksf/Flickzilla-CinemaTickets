const { Schema, model } = require('mongoose');

const InfoCastSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  profile_path: { type: String },
  character: { type: String },
});

const CastSchema = new Schema({
  id: { type: Number },
  cast: [InfoCastSchema],
});

module.exports = model('casts', CastSchema);


