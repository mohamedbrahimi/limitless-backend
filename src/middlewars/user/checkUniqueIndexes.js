//import
module.exports = (req, res, next) => {
    try {

        const userBody = req.body;
        // const exist =
        next();
    } catch (error) {
        return res.status(501).json({
            message: 'failed to add new user'
        });
    }
};
