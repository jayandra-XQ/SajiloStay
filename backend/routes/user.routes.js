import express from 'express';
import { profile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

//add your routes here
router.get('/profile', protectRoute,  profile);


export default router;