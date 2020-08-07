/**
 * @file Defines all authentication related route patterns.
 * @author Marble IT
 */
import express from 'express';

import AuthenticationController from '../controllers/AuthenticationController';

const router = express.Router({});

// Generate
router.post('/', AuthenticationController.generateToken);

export default router;
