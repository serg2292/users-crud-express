const UsersRepository = require("../data-access/UsersRepository");

class UsersService {
    async getAllUsers() {
        const users = await UsersRepository.getAllUsers()
        return users
    };
    async createUser(user) {
        const newUser = await UsersRepository.addUser(user);
        return newUser;
    };
    async getUser(id) {
        const user = await UsersRepository.findUserById(id);
        return user
    };
    async updateUser(data) {
        const updatedUser = await UsersRepository.updateUser(data);
        return updatedUser
    };
    async deleteUser(id) {
        const result = await UsersRepository.deleteUser(id);
        return result;
    }
}

module.exports = new UsersService()