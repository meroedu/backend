const jwt = require("jsonwebtoken");

const generateToken = ({ id, email }) => {
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate() + 1);

    return jwt.sign(
        {
            id,
            email,
            exp: parseInt(expirationDate.getTime() / 1000, 10)
        },
        process.env.JWT_SECRET
    );
};

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    generateToken, 
    validateToken,
    
};