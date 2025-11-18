import jwt from "jsonwebtoken";


export const isAuth = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "User doesn't have token" });
    }
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(400)
        .json({ message: "User doesn't have valid  token" });
    }
    //request .userid k andr verifryotken ki user id dal di
    req.userId = verifyToken.userId
    next()
  } catch (error) {
    return res
        .status(500)
        .json({ message: `IsAuth error ${error}` });
    }
  
};
