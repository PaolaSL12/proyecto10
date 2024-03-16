const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
  },
  {
    timestamps: true,
    collection: "events",
  }
);

const Event = mongoose.model("events", eventsSchema, "events");
module.exports = Event;