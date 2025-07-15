import { body, validationResult } from "express-validator";

const validateChar = [
  body("name").notEmpty().withMessage("Le nom du personnage est requis"),

  body("short_desc")
    .trim()
    .notEmpty()
    .withMessage("Une petite description est requise")
    .isLength({ min: 10 })
    .withMessage("la description doit contenir au moin 10 caractères"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

export default validateChar;
