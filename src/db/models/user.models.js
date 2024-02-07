import { Model, DataTypes, Sequelize } from 'sequelize'


export const USER_TABLE = 'users'

// le ayuda a sequelize a ver como debe crear la tabla
export const userSchema = {
    id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
}

export class User extends Model {

    static associate() {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: true
        }
    }
}
