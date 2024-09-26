import express from 'express'
import { getAllUsersController, createUsersController } from '../Controllers/userController.js';

const userRouter = express();

userRouter.get('/allUsers', getAllUsersController);
userRouter.post('/createUser', createUsersController);


export default userRouter;