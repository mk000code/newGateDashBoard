const wrap = handler => (req, res, next) => {
  Promise.resolve()
    .then(() => handler(req, res, next))
    .catch(error => {
      // Log request context and safe error identifiers, never request bodies or tokens.
      console.error("Unhandled request error", {
        method: req.method,
        path: req.path,
        name: error.name,
        code: error.code
      });
      if (res.headersSent) return next(error);
      res.status(500).json({ error: "Server error. Please try again later." });
    });
};

module.exports = wrap;
