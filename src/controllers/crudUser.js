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


    const user = await User.create(req.body);
    if (user){
        const token = jwt.sign({ user: user._id }, config.token.secret, {expiresIn: '12h'});
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



export {
    registerUser,
};
