
const upload = require("../../middlewares/files");
const { getEvents, getEventById, postEvento } = require("../controllers/events");

const eventsRouter = require("express").Router();

eventsRouter.get("/:id", getEventById);
eventsRouter.get("/", getEvents);
eventsRouter.post("/post", upload.single('img'), postEvento);

module.exports = eventsRouter;