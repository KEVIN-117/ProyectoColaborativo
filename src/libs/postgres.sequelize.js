import { Sequelize } from 'sequelize'
import { config } from '../config/app.config.js'
import { setupModels } from '../db/models/index.js'
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:@${config.dbPort}/${config.dbName}`
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI)
export const sequelize = new Sequelize(
    URI,
    {
        dialect: 'postgres',
        logging: true
    }
)

setupModels(sequelize)

// hara una sincromizacion y sequelise ira a crear la estructura
sequelize.sync();
