const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisismysecret"

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id || decoded.userId;
        if (!userId) {
            return res.status(403).json({ message: 'Invalid token payload' });
        }
        req.user = { userId };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateToken;
