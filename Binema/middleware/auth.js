const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'No authorization header' });
        }
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, jwtSecretKey);
        if (!verified) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
    }
};

module.exports = { validateToken };
