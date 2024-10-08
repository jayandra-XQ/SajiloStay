import express from 'express';
import { listingPlaceOnHome, placeAdd,  placeList, profile } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

//add your routes here
router.get('/profile', protectRoute,  profile);
router.post('/places',protectRoute, placeAdd);
router.get('/get-place',protectRoute,  placeList);
router.get('/home-place', listingPlaceOnHome)


export default router;