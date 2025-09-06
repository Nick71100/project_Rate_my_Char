export default (requiredRole) => {
  return (req, res, next) => {
    console.log(typeof req.user.role, typeof requiredRole);
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Accès refusé : rôle introuvable." });
    }
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Accès refusé : droits insuffisants." });
    }
    next();
  };
};
