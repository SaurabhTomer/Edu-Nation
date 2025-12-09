import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token. Authorization denied." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token." });
    }

    // Save user ID from token payload
    req.userId = decoded.id;  

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed.", error: error.message });
  }
};
