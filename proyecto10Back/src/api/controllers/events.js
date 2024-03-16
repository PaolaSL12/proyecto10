const Event = require("../models/events");

const getEvents = async (req, res, next) => {
    try {
      const events = await Event.find();
      return res.status(200).json(events);
    } catch (error) {
      return res.status(400).json("error");
    }
  };

  const getEventById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
      return res.status(200).json(event);
    } catch (error) {
      return res.status(400).json("error");
    }
  };

  const postEvento = async (req, res, next) => {
    try {
      const newEvent = new Event(req.body);

      
      if (req.file) {
        newEvent.img = req.file.path
       }

      const event = await newEvent.save();
      return res.status(201).json(event);
    } catch (error) {
      return res.status(400).json("error");
    }
  };
  

  module.exports = { getEvents, getEventById, postEvento }