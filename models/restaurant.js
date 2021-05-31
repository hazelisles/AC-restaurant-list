const mongoose = require('mongoose')
const { Schema } = mongoose
const restaurantsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  webpage: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurants', restaurantsSchema)