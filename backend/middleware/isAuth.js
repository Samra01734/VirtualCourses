import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id || decoded.userId;  // ✅ THIS IS IMPORTANT

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default isAuth;