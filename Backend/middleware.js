const jwt = require("jsonwebtoken");
const {JWT_SECRET}=  require("./config"); 


const authmiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
      return res.status(403).json({ 
          msg: "Invalid token"
      });
  }

  const token = authheader.split(' ')[1]; // Extracting token from JWT header 

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
  } catch (error) {
      return res.status(403).json({});
  }
}

module.exports = {
  authmiddleware
};