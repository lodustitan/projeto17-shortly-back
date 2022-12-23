import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyToken(request) {
    const token = request?.replace('Bearer ', '');
    
    try {
        const jsonwebtoken = jwt.verify(token, process.env.JWTTOKEN_SECRET_KEY);
        
        return {token, jsonwebtoken};
    } catch (err) {
        return false;
    }
}