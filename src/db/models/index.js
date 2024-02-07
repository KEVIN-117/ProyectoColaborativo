import { User, userSchema } from './user.models.js'
import { Product, productSchema } from './product.model.js'


//  se encargara de inicializar todos nuestros modelos
export function setupModels(sequelize) {
    // al hacer init este leera la esquema que se le envio como parametro, para que de esta manera pueda saber como debe crer la tabla: que campos debe tener, tipos de datso, PK
    User.init(userSchema, User.config(sequelize))
    Product.init(productSchema, Product.config(sequelize))


}
