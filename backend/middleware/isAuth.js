import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // Get token from cookies OR Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user safely
    req.user = {
      id: decoded.id || decoded.userId,
    };

    return next();
  } catch (error) {
    console.log("Auth Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default isAuth;