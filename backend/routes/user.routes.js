import express from 'express';
import { placeAdd, profile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

//add your routes here
router.get('/profile', protectRoute,  profile);
router.post('/places',protectRoute, placeAdd);


export default router;