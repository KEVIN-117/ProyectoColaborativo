import app from "./app.js";
import { config } from './config/app.config.js'


const port = config.port



app.listen(port)

console.log('server listening on port', port)
