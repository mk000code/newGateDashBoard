const { verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/settings");

module.exports = function authenticate(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = verify(match[1], JWT_SECRET);
    if (!payload.id) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }
    req.uid = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
};
