const { isAuth } = require("../../middlewares/auth");
const { getAttendees, confirmAttendee, createAttendee, updateAttendee, getAttendeesByName, getAttendeesById, cancelAttendee } = require("../controllers/attendees");

const attendeesRouter = require("express").Router();


attendeesRouter.get("/", getAttendees);
attendeesRouter.get("/:id", getAttendeesById)
attendeesRouter.get("/name/:name", getAttendeesByName)
attendeesRouter.put("/:eventId", isAuth ,confirmAttendee);
attendeesRouter.put("/cancel/:eventId", isAuth ,cancelAttendee);
attendeesRouter.post("/", createAttendee);
attendeesRouter.put("/:id/:eventId", updateAttendee)



module.exports = attendeesRouter;