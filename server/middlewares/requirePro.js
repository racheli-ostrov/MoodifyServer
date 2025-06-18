function requirePro(req, res, next) {
  const role = req.user?.role;
  if (role === "pro") {
    next();
  } else {
    return res.status(403).json({ error: "Access only for Pro users" });
  }
}

module.exports = requirePro;
