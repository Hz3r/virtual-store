// routes/order.routes.js
import express from 'express';
import { createOrder, getOrderHistory } from '../controllers/order.controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-order', verifyToken, createOrder);
router.get('/order-history', verifyToken, getOrderHistory);

export default router;
