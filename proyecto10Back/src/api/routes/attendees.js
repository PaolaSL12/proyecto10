const { isAuth } = require("../../middlewares/auth");
const { getAttendees, confirmAttendee, updateAttendee, getAttendeesByName, getAttendeesById, cancelAttendee, deleteAttendee } = require("../controllers/attendees");

const attendeesRouter = require("express").Router();


attendeesRouter.get("/", getAttendees);
attendeesRouter.get("/:id", getAttendeesById)
attendeesRouter.get("/name/:name", getAttendeesByName)
attendeesRouter.put("/:eventId", isAuth ,confirmAttendee);
attendeesRouter.put("/cancel/:eventId", isAuth ,cancelAttendee);
attendeesRouter.put("/:id/:eventId", updateAttendee);
attendeesRouter.delete("/:id", deleteAttendee)



module.exports = attendeesRouter;