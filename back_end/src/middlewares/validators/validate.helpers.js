import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  console.log("Validation errors:", errors.array()); // Debug

  if (!errors.isEmpty()) {
    console.log("Returning validation errors"); // Debug
    return res.status(400).json({
      message: "Validation échouée",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  console.log("Validation passed"); // Debug
  next();
};
