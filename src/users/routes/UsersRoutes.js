const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRouter = Router()

usersRouter.get('/', UsersController.getAllUsers)
usersRouter.get('/:id', UsersController.getUser)
usersRouter.post('/', UsersController.createUser)
usersRouter.put('/:id', UsersController.updateUser)
usersRouter.delete('/:id', UsersController.deleteUser)

module.exports = usersRouter