import User from '../../models/user';

module.exports = async (req, res, next) => {

    const { username, email, phone } = req.body;

    /**
     * check email, username, phone if are unique
     */

    const existedUsername = await User.findOne({ username });
    if (existedUsername)
        return res.status(443).json({
            error: false,
            errormessage: "username is already exist",
            errormessageKey: "USERNAME_EXISTED"
        })

    const existedEmail = await User.findOne({ email });
    if (existedEmail)
        return res.status(443).json({
            error: false,
            errormessage: "email is already exist",
            errormessageKey: "EMAIL_EXISTED"
        })

    if (phone) {
        const existedPhone = await User.findOne({ phone });
        if (existedPhone)
            return res.status(443).json({
                error: false,
                errormessage: "phone is already exist",
                errormessageKey: "PHONE_EXISTED"
            })
    }

    next();

};
