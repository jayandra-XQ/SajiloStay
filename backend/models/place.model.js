import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  extraInfo: {
    type: String
  },
  checkIn: {
    type: Number,
    required: true
  },
  checkOut: {
    type: Number,
    required: true
  },
  maxGuests: {
    type: Number,
    required: true
  }
}, {timestamps: true})

const Place = mongoose.model("Place", placeSchema);

export default Place;