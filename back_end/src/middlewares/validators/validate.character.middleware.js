import { body } from "express-validator";
import { handleValidationErrors } from "./validate.helpers.js";

export const validateCharacterCreate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom du personnage est requis")
    .isLength({ min: 2, max: 255 })
    .withMessage("Le nom doit contenir entre 2 et 255 caractères"),

  body("short_desc")
    .trim()
    .notEmpty()
    .withMessage("Une description courte est requise")
    .isLength({ min: 10, max: 150 })
    .withMessage("La description doit contenir entre 10 et 150 caractères"),

  body("long_desc")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("La description longue ne peut dépasser 1000 caractères"),

  body("image_url")
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      if (!value) return true;

      const urlRegex = /^https?:\/\/.+\..+/;
      if (!urlRegex.test(value)) {
        throw new Error(
          "L'URL doit être complète (commencer par http:// ou https://)"
        );
      }
      return true;
    }),

  body("id_gender")
    .notEmpty()
    .withMessage("Le genre est requis")
    .isInt({ min: 1 })
    .withMessage("Genre invalide"),

  body("id_artwork")
    .notEmpty()
    .withMessage("L'œuvre est requise")
    .isInt({ min: 1 })
    .withMessage("Œuvre invalide"),

  handleValidationErrors,
];
