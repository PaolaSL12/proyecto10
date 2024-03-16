const Attendee = require("../models/attendees");
const User = require("../models/users");

const getAttendees = async (req, res, next) => {
  try {
    const attendees = await Attendee.find().populate("events");
    return res.status(200).json(attendees);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getAttendeesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendee = await Attendee.findById(id).populate("events");
    return res.status(200).json(attendee);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getAttendeesByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const attendee = await Attendee.find({ name }).populate("events");
    return res.status(200).json(attendee);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const confirmAttendee = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { name } = req.user;

    const oldAttendee = await Attendee.find({ name });

    if (oldAttendee) {
      const newAttendee = new Attendee({
        name: oldAttendee[0].name,
        email: oldAttendee[0].email,
        events: [eventId],
      });

      console.log(oldAttendee[0]);

      newAttendee._id = oldAttendee[0]._id;
      console.log(newAttendee);
      newAttendee.events = [...oldAttendee[0].events, ...newAttendee.events];
      const attendee = await Attendee.findByIdAndUpdate(
        oldAttendee[0]._id,
        newAttendee,
        { new: true }
      );
      return res.status(201).json(attendee);
    } else {
      const newAttendee = new Attendee(req.body);
      const attendee = await newAttendee.save();
      return res.status(201).json(attendee);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

const createAttendee = async (req, res, next) => {
  try {
    const newAttendee = new Attendee(req.body);
    const attendee = await newAttendee.save();
    return res.status(201).json(attendee);
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

const updateAttendee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldAttendee = await Attendee.findById(id);
    const newAttendee = new Attendee(req.body);
    newAttendee._id = id;
    newAttendee.events = [...oldAttendee.events, ...newAttendee.events];
    const attendeeUpdated = await Attendee.findByIdAndUpdate(id, newAttendee, {
      new: true,
    });

    return res.status(200).json(attendeeUpdated);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const cancelAttendee = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const { name } = req.user;

    const oldAttendee = await Attendee.findOne({ name }); 
    console.log(oldAttendee.events);

    oldAttendee.events = await oldAttendee.events.remove(eventId);
 
    console.log(oldAttendee.events);

    const attendee = await oldAttendee.save()
    return res.status(200).json(attendee);
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};

module.exports = {
  getAttendees,
  getAttendeesById,
  confirmAttendee,
  createAttendee,
  updateAttendee,
  getAttendeesByName,
  cancelAttendee
};
