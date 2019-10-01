import User from '../models/user';

async function registerUser(req, res, next) {

    const user = await User.create(req.body);

    return res.status(200).json(user);
}

export {
    registerUser,
};
