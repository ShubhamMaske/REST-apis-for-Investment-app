import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    // Retrieve the authorization header
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = { id: decoded.id };
        
        next();
    } catch (err) {
        res.status(401).json({ message: 'user is Unauthorized' });
    }
};

export default auth;
