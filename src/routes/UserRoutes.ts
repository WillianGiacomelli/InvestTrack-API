const { Router } = require('express');
import { createUser, authUser, resetPassword, resetPasswordRequest, checkToken } from '../controllers/user/UserController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const userRoutes = Router();

userRoutes.post('/user' , createUser);
userRoutes.post('/auth', authUser);
userRoutes.get('/auth/check-token', checkToken);
userRoutes.post('/auth/reset-password-request', resetPasswordRequest)
userRoutes.post('/auth/reset-password', verifyAuthentication, resetPassword)

export default userRoutes;