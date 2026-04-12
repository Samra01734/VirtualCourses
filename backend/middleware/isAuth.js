import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // Get token from cookies OR Authorization header
    let token =
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: standard way (IMPORTANT CHANGE)
    req.user = {
      id: decoded.id || decoded.userId,
    };

    next();a
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default isAuth;