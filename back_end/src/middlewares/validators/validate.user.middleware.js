import { body, validationResult } from "express-validator";

export const validateReg = [
  body("pseudo")
    .trim()
    .notEmpty()
    .withMessage("Le pseudo est requis.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Le pseudo doit contenir entre 3 et 100 caractères."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'adresse email est requise.")
    .isEmail()
    .withMessage("Adresse email invalide."),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis.")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
];

export const validateLogin = [
  body("pseudo").trim().notEmpty().withMessage("Le pseudo est requis."),

  body("password").notEmpty().withMessage("Le mot de passe est requis."),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation échouée.",
      errors: errors.array(),
    });
  }

  next();
};
