import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/settings';

async function registerUser(req, res, next) {


    const user = await User.create(req.body);
    if (user){
        const token = jwt.sign({ user: user._id }, config.token.secret_client, {expiresIn: '12h'});
        return res.status(200).json({
            token,
            _id: user._id
        });
    }else {
        return res.status(501).json(
            {
                error: true,
                errormessage: "system error when try to add new user",
                errormessageKey: "SYSTEM_ERROR"
            }
        )
    }

}

async function loginUser(req, res, next) {


    const { username, password } = req.body;

    const user = await User.findOne({
        $or: [
            { username },
            { email: username },
            { phone: username }
        ]
    });


    if ( !user )
        return res.status(401).json(
            {
                error: true,
                errormessage: "username not found",
                errormessageKey: "USER_NOT_FOUND"
            }
        )
    const match = await user.isValidPassword(password);

    if (match) {
        const token = jwt.sign({ user: user._id }, config.token.secret_client, {expiresIn: '12h'});
        return res.status(200).json({
            token,
            _id: user._id
        });
    } else {

        return res.status(401).json(
            {
                error: true,
                errormessage: "user password not correct",
                errormessageKey: "USER_PASSWORD_NOT_FOUND"
            });
    }


}



export {
    registerUser,
    loginUser
};
