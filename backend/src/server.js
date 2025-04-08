// import
import 'dotenv/config'
import connectDB  from "./config/db.js";
import http from 'http';
import app  from './app.js'
// variables de entorno
const PORT = process.env.PORT || 3000;

const server = http.createServer(app)



connectDB().then(()=>{
    server.listen(PORT, ()=>{
        console.log(`servidor iniciado en el puerto:` , PORT);
    })
})
