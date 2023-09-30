const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
  title: { type: String },
  year: { type: String },
  rated: { type: String },
  released: { type: String },
  runtime: { type: String },
  genre: { type: String },
  director: { type: String },
  writer: { type: String },
  actors: { type: String },
  plot: { type: String },
  language: { type: String },
  country: { type: String },
  awards: { type: String },
  poster: [{ type: String }],
  imdbRating: { type: String },
  imdbVotes: { type: String },
  imdbId: { type: String },
  trailerVideoId: { type: String },
  backdrop: [{ type: String }],
  isComingSoon: {
    type: Boolean,
    default: false,
  },
  cast: { type: Schema.Types.ObjectId, ref: 'casts' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = model('movies', MovieSchema);
