const express = require('express');
const usersRouter = require('./users/routes/UsersRoutes');

function server() {
    const PORT = 3000;
    const HOST = '127.0.0.1';

    const app = express()
    app.use(express.json())
    app.use('/users', usersRouter)
    app.listen(PORT, HOST, () => console.log(`Listening on ${HOST}:${PORT}`))
}

module.exports = server