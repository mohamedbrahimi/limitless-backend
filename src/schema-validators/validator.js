import { Validator } from 'express-json-validator-middleware';
import ajvErrors from 'ajv-errors';

// Initialize a Validator instance first
const options = {
    allErrors: true, jsonPointers: true,
};
const schemaValidator = new Validator(options); // pass in options to the Ajv instance

ajvErrors(schemaValidator.ajv);

export default schemaValidator;
