import express from 'express';
import { uploadByLink } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/upload-by-link', uploadByLink);


export default router