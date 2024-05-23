const UsersController = require("../controllers/UsersController");

const requestHandler = {
    async GET(_, res, match) {
        if (match) {
            await UsersController.getUser(res, match);
        } else {
            await UsersController.getAllUsers(res);
        }
    },
    async POST(req, res) {
        await UsersController.createUser(req, res);
    },
    async PUT(req, res, match) {
        await UsersController.updateUser(req, res, match);
    },
    async DELETE(req, res, match) {
        await UsersController.deleteUser(req, res, match);
    },
    async handle404(_, res) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

async function usersRoutes(req, res) {
    const url = req.url;
    const method = req.method;
    const match = url.match(/^\/users\/(\d+)$/);

    const handler = requestHandler[method];
    if (handler) {
        await handler(req, res, match);
    } else {
        await routesRecord.handle404(req, res);
    }
}


module.exports = usersRoutes