import jwt from 'jsonwebtoken'

export class JwtService {
    static getSecret() {
        const secret = process.env.JWT_SECRET;
        
        if (!secret || secret.trim() === "") {
            throw new Error("INTERNAL_SERVER_ERROR: JWT_SECRET is not configured properly.");
        }
        
        return secret;
    }

    static generateToken(payload) {
        const secret = this.getSecret();
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    }

    static verifyToken(token) {
        try {
            const secret = this.getSecret();
            return jwt.verify(token, secret);
        } catch (err) {
            return null;
        }
    }
}