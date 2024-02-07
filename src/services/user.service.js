import { faker, id_ID } from "@faker-js/faker"

import { sequelize } from '../libs/postgres.sequelize.js'
export default class UserService {
    constructor(size) {
        this.users = []
        this.size = size
        //this.generate()
    }
    generate() {
        const limit = this.size || 20;
        for (let i = 0; i < limit; i++) {
            this.users.push({
                id: faker.database.mongodbObjectId(),
                name: faker.person.firstName(),
                lastaName: faker.person.lastName(),
                gender: faker.person.sexType(),
                job: faker.person.jobTitle(),
                birthdate: faker.date.birthdate()
            })
        }
    }
    async create(data) {
        const newUser = await sequelize.models.User.create(data)
        return newUser
    }

    async find() {
        const response = await sequelize.models.User.findAll()
        return response
    }

    async findOne(id) {
        const response = await sequelize.models.User.findByPk(id)
        return response
    }

    async update(id, data) {
        const findUser = await this.findOne(id)
        findUser.update(data)
        return findUser
    }

    async delete(id) {
        const findUser = await this.findOne(id)
        findUser.destroy()
        return id
    }
}
