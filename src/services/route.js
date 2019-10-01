import { Router } from 'express';
import checkUserField from '../middlewars/user/checkUserRequiredFields'
import {
    registerUser,
} from '../controllers/crudUser';

const publicClientRouter = Router();
const privateClientRouter = Router();


// PUBLIC API
publicClientRouter.route('/register').post(checkUserField, registerUser); // Add new user

export {
    publicClientRouter,
    privateClientRouter,
};
