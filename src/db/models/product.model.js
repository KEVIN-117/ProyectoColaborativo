import { Model, DataTypes } from 'sequelize'



const PRODUCT_TABLE = "products"

export const productSchema = {
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
  stock:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  price:{
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

export class Product extends Model{
  static config(sequelize){
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: true

    }
  }
}
