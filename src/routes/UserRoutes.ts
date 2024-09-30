const { Router } = require('express');
import { createUser, authUser } from '../controllers/user/UserController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const userRoutes = Router();

userRoutes.post('/users', verifyAuthentication , createUser);
userRoutes.post('/auth', authUser);

export default userRoutes;