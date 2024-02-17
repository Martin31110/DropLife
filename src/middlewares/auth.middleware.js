import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, TOKEN_SECRET, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      console.log("Decoded user from token:", user);
      req.user = decodedToken;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};