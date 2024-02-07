import ProductService from '../services/product.service.js'

const productService = new ProductService()


export const createProduct = async (req, res) =>{
  const data = req.body
  const product = await productService.create(data)
  res.json(product)
}

export const updateProduct = async (req, res) =>{
  try {
    const {id} = req.params
    const body = req.body
    const newData = await productService.update(body, id)
    res.json(newData)

  }catch (e){
    return res.json({message: "Error in update product"})
  }
}

export const products = async (req, res) =>{
  const allProducts = await productService.find()
    res.json(allProducts)
}

export const product = async (req, res) =>{
  try {
    const {id} = req.params
    const product = await productService.findOne(id)
    res.json(product)
  }catch (e){
    return res.json({message: "Producto No Encontrado"})
  }
}

export const deleted = async (req, res) =>{
  try {
    const {id} = req.params
    const data = productService.delete(id)
    res.json(data)
  }catch (e){
    return res.json({message: "Producto No Encontrado"})
  }
}
