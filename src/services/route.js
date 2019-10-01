import { Router } from 'express';
import checkUserField from '../middlewars/user/checkUserRequiredFields'
import {
    registerUser,
} from '../controllers/crudUser';
import {
    savePlace,
} from '../controllers/crudPlace';
import {
    createTag,
    listTags,
    deleteTag,
} from '../controllers/crudTag';

const publicClientRouter = Router();
const privateClientRouter = Router();


// PUBLIC API
publicClientRouter.route('/register').post(checkUserField, registerUser); // Add new user


// PRIVATE API
//Places:
privateClientRouter.route('places/save').post(savePlace);
//Tags:
privateClientRouter.route('tags/create').post(createTag);
privateClientRouter.route('tags/delete').post(deleteTag);
privateClientRouter.route('tags/list').post(listTags);

export {
    publicClientRouter,
    privateClientRouter,
};
