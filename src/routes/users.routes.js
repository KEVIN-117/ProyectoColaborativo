import { Router } from 'express'
import { createUser, deleted, home, updateUser, user, users } from '../controllers/user.controller.js'
const routerUser = Router()

routerUser.get('/', home)

routerUser.get('/users', users)

routerUser.get('/users/:id', user)

routerUser.post('/users', createUser)

routerUser.patch('/users/:id', updateUser)

routerUser.delete('/users/:id', deleted)

export default routerUser
