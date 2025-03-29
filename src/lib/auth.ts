import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


interface UserPayload {
    id: string;
    username: string;
}

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET; 


export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: UserPayload): string {
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        JWT_SECRET,
        { expiresIn: '3d' }
    );
}

