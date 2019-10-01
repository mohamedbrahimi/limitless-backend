import { EMAIL_VALIDATION, PHONE_VALIDATION } from '../../config/constant';
module.exports = (req, res, next) => {

    const { username, email, password, phone } = req.body;

    /**
     * check required fields
     */

    if ( !username || username.length < 4)
         return res.status(442).json({
             error: false,
             errormessage: "username is required and > 4",
             errormessageKey: "USERNAME_REQUIRED"
         })


    if ( !email || !EMAIL_VALIDATION.test(String(email).toLowerCase()))
        return res.status(442).json({
            error: false,
            errormessage: "email is required and valid",
            errormessageKey: "EMAIL_REQUIRED"
        })

    if ( phone && !PHONE_VALIDATION.test(String(phone).toLowerCase()))
        return res.status(442).json({
            error: false,
            errormessage: "phone is required and valid",
            errormessageKey: "PHONE_REQUIRED"
        })

    if ( !password && password.length < 8 )
        return res.status(442).json({
            error: false,
            errormessage: "password is required and > 8",
            errormessageKey: "PASSWORD_REQUIRED"
        })
    next();

};
