
const { getUsers, register, login, confirmAttendee } = require("../controllers/users");


const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.post("/register", register);
usersRouter.post("/login", login)



module.exports = usersRouter;