import { Router } from 'express';
import checkUserField from '../middlewars/user/checkUserRequiredFields'
import checkExisted from '../middlewars/user/checkUniqueIndexes'
import {
    registerUser,
    loginUser
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
publicClientRouter.route('/register').post(checkUserField, checkExisted, registerUser); // Add new user
publicClientRouter.route('/login').post(loginUser); // login


// PRIVATE API
//Places:
privateClientRouter.route('/places/save').post(savePlace);
//Tags:
privateClientRouter.route('/tags/create').post(createTag);
privateClientRouter.route('/tags/delete').post(deleteTag);
privateClientRouter.route('/tags/list').post(listTags);

export {
    publicClientRouter,
    privateClientRouter,
};
