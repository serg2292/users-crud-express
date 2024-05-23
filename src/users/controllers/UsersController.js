const UsersService = require("../services/UsersService");

class UsersController {
    async createUser(req, res) {
        try {
            const result = await UsersService.createUser(req.body);
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    };
    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const result = await UsersService.deleteUser(userId);
            return res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    };
    async getAllUsers(_, res) {
        try {
            const data = await UsersService.getAllUsers();
            return res.json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    };
    async getUser(req, res) {
        const userId = req.params.id;
        try {
            const data = await UsersService.getUser(userId);
            if (data) {
                return res.json(data)
            } else {
                res.status(404).json({ error: 'User not found' })
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }

    }
    async updateUser(req, res) {
        const userId = req.params.id;
        const body = { id: userId, ...req.body }

        try {
            const result = await UsersService.updateUser(body);
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

}

module.exports = new UsersController()