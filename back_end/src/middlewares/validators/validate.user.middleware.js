import { body } from "express-validator";
import { handleValidationErrors } from "./validate.helpers.js";

export const validateRegistration = [
  body("pseudo")
    .trim()
    .notEmpty()
    .withMessage("Le pseudo est requis")
    .isLength({ min: 3, max: 50 })
    .withMessage("Le pseudo doit contenir entre 3 et 50 caractères")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Le pseudo ne peut contenir que des lettres, chiffres, _ et -"
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'adresse email est requise")
    .isEmail()
    .withMessage("Adresse email invalide")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/)
    .withMessage(
      "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"
    ),

  body("id_gender").optional().isInt({ min: 1 }).withMessage("Genre invalide"),

  handleValidationErrors,
];

export const validateLogin = [
  body("pseudo").trim().notEmpty().withMessage("Le pseudo est requis"),
  body("password").notEmpty().withMessage("Le mot de passe est requis"),
  handleValidationErrors,
];
