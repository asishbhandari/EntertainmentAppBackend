const jwt = require("jsonwebtoken");
const secret = "@sish!!123&*aish";

const generateToken = (user) => {
  const payload = {
    id: user._id,
    usrname: user.usrName,
    email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
};

const verfiyToken = (req, res, next) => {
  const token =
    req?.headers?.authorization && req?.headers?.authorization.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "unauthorized : invalid token" });
  }
};

module.exports = { generateToken, verfiyToken };
