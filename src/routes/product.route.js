import { Router  } from 'express';
import { product, createProduct, updateProduct, deleted, products } from "../controllers/product.controller.js"

const productRouter = Router();

productRouter.get('/product', products)

productRouter.get('/product:id', product)

productRouter.post("/product", createProduct)

productRouter.patch("/product:id", updateProduct)

productRouter.delete("/product:id", deleted)

export default productRouter


