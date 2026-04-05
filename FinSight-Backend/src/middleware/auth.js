const jwt = require('jsonwebtoken');

// ✅ PROTECT ROUTE
exports.protect = (req, res, next) => {
    let token;

    // Check header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

// ✅ ROLE BASED ACCESS
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        next();
    };
};