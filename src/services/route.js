import { Router } from 'express';
import schemaValidator from '../schema-validators/validator';
import userVerificationSchema from '../schema-validators/users/userSchema';
import {
    registerUser,
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
publicClientRouter.route('/users/register').post(schemaValidator.validate({ body: userVerificationSchema }), registerUser); // Add new user


// PRIVATE API
//Places:
privateClientRouter.route('places/save').post(savePlace);
//Tags:
privateClientRouter.route('tags/create').post(createTag);

export {
    publicClientRouter,
    privateClientRouter,
};
