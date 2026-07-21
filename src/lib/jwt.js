import { SignJWT, jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

// Helper function to decode token (Not exported, used internally)
async function decodeToken(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function signToken(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(SECRET_KEY);
}

// Just checks if the token belongs to an admin (Returns boolean)
export async function checkIsAdmin(token) {
    const payload = await decodeToken(token);
    return payload?.role === 'admin';
}

// Gets the UID of any valid user
export async function getUserUid(token) {
    const payload = await decodeToken(token);
    return payload?.uid || null;
}

// Checks admin AND returns UID
export async function getAdminUid(token) {
    const payload = await decodeToken(token);
    if (payload?.role === 'admin') {
        return payload?.uid || null;
    }
    return null;
}