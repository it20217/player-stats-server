const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authToken = req.get("Authorization");
  let decodedToken;
  if (!authToken) {
    res.status(401).json({
      result: null,
      error: "Not authenticated"
    });
  } else {
    const token = authToken.split(" ")[1];
    decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded) {
        req.userId = decoded.id;
        next();
      } else {
        return res.status(401).json({
          result: null,
          error: "Not authenticated"
        }).send();
      }
    });
  }
}

