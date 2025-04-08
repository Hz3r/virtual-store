// import
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from 'express-rate-limit';

import xss from 'xss-clean';
import productRoutes from './routes/products.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import authRoutes from './routes/auth.routes.js';
// varibales
const app = express()

// middlewares directos
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(rateLimit({
    windowMs: 15* 60 * 1000,
    max: 100,
    message:'Desasiadas solicitudes desde esta ip , intenta de neuvo luego'
}))
// rutas
app.get('/',(req,res)=>{
    res.send('HELLO WORLD')
})

app.use('/api',productRoutes)
app.use('/payment',paymentRoutes)
app.use('/api/auth', authRoutes);


export default app;