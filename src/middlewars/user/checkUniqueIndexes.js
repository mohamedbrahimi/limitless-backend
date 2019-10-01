module.exports = (req, res, next) => {
    try {

        console.log(req.body)
        next();
    } catch (error) {
        return res.status(501).json({
            message: 'failed to add new user'
        });
    }
};
