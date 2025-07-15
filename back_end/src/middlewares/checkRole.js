export default (requiredRole) => {
  return (req, res, next) => {
    console.log("toto");
    console.log(typeof req.user.role, typeof requiredRole);
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Accès refusé : rôle introuvable." });
    }
    console.log(req.user.role !== Number(requiredRole));
    console.log(requiredRole);
    console.log(req.user.role);
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Accès refusé : droits insuffisants." });
    }
    next();
  };
};
