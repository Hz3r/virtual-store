
import express from 'express';
import { registerUser, loginUser, protectRoute } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', verifyToken, protectRoute);

export default router;
