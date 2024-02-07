import UserService from "../services/user.service.js";

const userService = new UserService()



export const home = (req, res) => {
    res.json({ "message": "welcome to page main users" })
}

export const createUser = async (req, res) => {
    const data = req.body
    const newUser = await userService.create(data)
    res.json(newUser)
}


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body
        const newData = await userService.update(id, body)
        res.json(newData)
    } catch (err) {
        next(err)
    }
}


export const users = async (req, res) => {
    const allProducts = await userService.find()
    res.json(allProducts)
}

export const user = async (req, res, next) => {
    try {
        const { id } = req.params
        const oneProduct = await userService.findOne(id)
        res.json(oneProduct)
    } catch (err) {
        next(err)
    }
}

export const deleted = async (req, res, next) => {
    try{
        const { id } = req.params
        const data = await userService.delete(id)
        res.json(data)
    }catch(err){
        next(err)
    }
}