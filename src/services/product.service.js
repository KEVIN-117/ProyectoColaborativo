import { sequelize } from '../libs/postgres.sequelize.js'
import { faker, id_ID } from "@faker-js/faker"


export default  class ProductService{
  constructor() {

  }

  async create(data){
    const newProduct = await sequelize.models.Product.create(data)
    return newProduct
  }

  async find(){
    const products = await sequelize.models.Product.findAll()
    return products
  }

  async findOne(id){
    const product = await sequelize.models.Product.findByPk(id)
    return product
  }

  async update(data, id){
    const product = await this.findOne(id)
    await product.update(data)
    return product
  }

  async delete(id){
    const product = await this.findOne(id)
    await product.destroy()
    return id
  }
}
