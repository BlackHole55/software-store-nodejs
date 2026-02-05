import jwt from 'jsonwebtoken'

export class JwtService {
    private static getSecret(): string {
        const secret = process.env.JWT_SECRET;
        
        if (!secret || secret.trim() === "") {
            throw new Error("INTERNAL_SERVER_ERROR: JWT_SECRET is not configured properly.");
        }
        
        return secret;
    }

    static generateToken(payload: object): string {
        const secret = this.getSecret();
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    }

    static verifyToken(token: string): any {
        try {
            const secret = this.getSecret();
            return jwt.verify(token, secret);
        } catch (err) {
            return null;
        }
    }
}