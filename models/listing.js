const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      rating: {
        type: String,
        required: true,
      },
      authorized: {
        type: String,
        required: true
      },
      yearExp: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      services: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model("Listing", listingSchema);
