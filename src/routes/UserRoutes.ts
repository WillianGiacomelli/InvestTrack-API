const { Router } = require('express');
import { createUser, authUser } from '../controllers/user/UserController';

const userRoutes = Router();

userRoutes.post('/user' , createUser);
userRoutes.post('/auth', authUser);

export default userRoutes;