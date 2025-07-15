import { body, validationResult } from "express-validator";

const validateArtwork = [
  body("title").notEmpty().withMessage("Le titre de l'oeuvre est requis"),

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

export default validateArtwork;
