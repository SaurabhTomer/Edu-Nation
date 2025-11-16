import jwt from 'jsonwebtoken'
import { cookieParser } from 'cookie-parser';

export const isAuth = async (req,res) => {
    try {
        const {token } = req.cookieParser
    } catch (error) {
        
    }
}