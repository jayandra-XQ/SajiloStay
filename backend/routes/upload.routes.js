import express from 'express';
import { uploadByFile, uploadByLink } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/upload-by-link', uploadByLink);
router.post('/upload-by-file', uploadByFile);


export default router