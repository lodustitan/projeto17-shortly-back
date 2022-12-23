import jwt from "jsonwebtoken";

export default function verifyToken(request) {
    const token = request?.replace('Bearer ', '');
    
    try {
        const jsonwebtoken = jwt.verify(token, "23HH42K");
        
        return {token, jsonwebtoken};
    } catch (err) {
        return false;
    }
}