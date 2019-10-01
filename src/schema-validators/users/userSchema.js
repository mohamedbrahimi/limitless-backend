
const userSchema = {
    type: 'object',
    required: ['email','password','username','phone'],
    allOf: [{
        properties: {
            email: {
                type: 'string',
                pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
            },
            username: {
                type: 'string',
                pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$',
            },
            phone: {
                type: 'string',
                pattern: '^\\+213[567]\\d{8}$',
            },
            password: {
                type: 'string',
                pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\W]{8,}$',
                maxLength: 16,
                minLength: 8,
            },
        },
    }],
    errorMessage: {
        properties: {
            email: JSON.stringify({
                success: false,
                errorMessage: 'Email is not valid',
                errorMessageKey: 'INVALID_EMAIL',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Email is not valid',
                },
            }),
            username: JSON.stringify({
                success: false,
                errorMessage: 'Username is not valid',
                errorMessageKey: 'INVALID_USERNAME',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Username is not valid',
                },
            }),
            phone: JSON.stringify({
                success: false,
                errorMessage: 'Phone number is invalid',
                errorMessageKey: 'INVALID_PHONE',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Phone number is invalid',
                },
            }),
            password: JSON.stringify({
                success: false,
                errorMessage: 'Password is not valid',
                errorMessageKey: 'INVALID_PASSWORD',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Password is not valid',
                },
            }),
        },
        required: {
            email: JSON.stringify({
                success: false,
                errorMessage: 'Email required',
                errorMessageKey: 'EMAIL_REQUIRED',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Email required',
                },
            }),
            username: JSON.stringify({
                success: false,
                errorMessage: 'Username required',
                errorMessageKey: 'USERNAME_REQUIRED',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Username required',
                },
            }),
            phone: JSON.stringify({
                success: false,
                errorMessage: 'Phone is required',
                errorMessageKey: 'PHONE_REQUIRED',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Phone is required',
                },
            }),
            password: JSON.stringify({
                success: false,
                errorMessage: 'Password is required',
                errorMessageKey: 'PASSWORD_REQUIRED',
                errorMessageTranslation: {
                    fr: '',
                    ar: '',
                    en: 'Password is required',
                },
            }),
        },
    },
};

export default userSchema;
