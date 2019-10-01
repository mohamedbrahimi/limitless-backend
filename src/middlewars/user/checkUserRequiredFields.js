
module.exports = (req, res, next) => {
    try {

        next();
    } catch (error) {
        return res.status(501).json({
            message: 'failed to add new user'
        });
    }
};
