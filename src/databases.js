const { createUsersTable } = require("./users/database/usersDB");

function databases() {
    createUsersTable();
}

module.exports = databases