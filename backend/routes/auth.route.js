import express from 'express';
const authRouter = express.Router();
import { login, logout, signUp } from '../controllers/auth.controller.js';
import e from 'express';
authRouter.post('/signup', signUp)
// Import the signUp function from the controller
authRouter.post('/login', login)
authRouter.post('/logout', logout);

export default authRouter;