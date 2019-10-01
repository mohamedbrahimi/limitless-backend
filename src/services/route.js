import { Router } from 'express';
import checkUserField from '../middlewars/user/checkUserRequiredFields'
import {
    registerUser,
    loginUser
} from '../controllers/crudUser';
import {
    savePlace,
} from '../controllers/crudPlace';
import {
    createTag,
} from '../controllers/crudTag';

const publicClientRouter = Router();
const privateClientRouter = Router();


// PUBLIC API
publicClientRouter.route('/register').post(checkUserField, registerUser); // Add new user
publicClientRouter.route('/login').post(loginUser); // login


// PRIVATE API
//Places:
privateClientRouter.route('places/save').post(savePlace);
//Tags:
privateClientRouter.route('tags/create').post(createTag);

export {
    publicClientRouter,
    privateClientRouter,
};
