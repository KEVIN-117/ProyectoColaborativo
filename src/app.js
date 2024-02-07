import express from 'express'
import morgan from 'morgan'
import routerUser from './routes/users.routes.js'
import routerProduct from './routes/product.route.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.get('/', (req, res) => {
  res.send("hello world")
})




app.use('/api', routerUser)
app.use('/api', routerProduct)
export default app
