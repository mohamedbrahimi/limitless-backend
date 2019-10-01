import { Router } from 'express';
import schemaValidator from '../schema-validators/validator';
import userVerificationSchema from '../schema-validators/users/userSchema';
import {
    registerUser,
} from '../controllers/crudUser';

const publicClientRouter = Router();
const privateClientRouter = Router();


// PUBLIC API
publicClientRouter.route('/users/register').post(schemaValidator.validate({ body: userVerificationSchema }), registerUser); // Add new user

export {
    publicClientRouter,
    privateClientRouter,
};
