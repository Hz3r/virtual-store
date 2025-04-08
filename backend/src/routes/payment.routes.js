
import express from 'express';
import { createOrder, success, pending, failure, handleWebhook } from '../controllers/payment.controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-order', verifyToken, createOrder);

router.get('/success', success);
router.get('/pending', pending);
router.get('/failure', failure);


router.post('/webhook', handleWebhook);


export default router;
