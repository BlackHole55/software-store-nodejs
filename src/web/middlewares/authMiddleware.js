import { JwtService } from "../../infrastructure/security/JwtService.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthenticated: Missing or malformed header' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthenticated: Token missing' });
    }

    const decoded = JwtService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ error: 'Unauthenticated: Invalid token' });
    }

    req.user = decoded;

    next();
}