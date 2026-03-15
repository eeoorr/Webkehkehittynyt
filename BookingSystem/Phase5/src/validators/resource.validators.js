// src/validators/resource.validators.js
import { body } from "express-validator";

// Validation rules for POST /api/resources
export const resourceValidators = [
  body("action")
    .exists({ checkFalsy: true })
    .withMessage("action is required")
    .trim()
    .isIn(["create"])
    .withMessage("action must be 'create'"),

  body("resourceName")
    .exists({ checkFalsy: true })
    .withMessage("The resource name is required")
    .isString()
    .withMessage("The resource name must be a string")
    .trim()
    .matches(/^[a-zA-Z0-9äöåÄÖÅ \,\.\-]+$/)
    .withMessage("The resource name can only contain letters, numbers, and spaces")
    .isLength({ min: 5, max: 30 })
    .withMessage("The resource name must be between 5 and 30 characters"),

  body("resourceDescription")
    .exists({ checkFalsy: true })
    .withMessage("The resource description is required")
    .isString()
    .withMessage("The resource description must be a string")
    .trim()
    .matches(/^[A-Za-z0-9äöåÄÖÅ \,\.\-]+$/)
    .withMessage("The resource description can only contain letters, numbers, and spaces")
    .isLength({ min: 10, max: 50 })
    .withMessage("The resource description must be between 10 and 50 characters"),

  body("resourceAvailable")
    .exists()
    .withMessage("The resource available flag is required")
    .isBoolean()
    .withMessage("The resource available flag must be boolean"),

  body("resourcePrice")
    .exists()
    .withMessage("The resource price is required")
    .isFloat({ min: 0 })
    .withMessage("The resource price must be a non-negative number"),

  body("resourcePriceUnit")
    .exists({ checkFalsy: true })
    .withMessage("The resource price unit is required")
    .isString()
    .withMessage("The resource price unit must be a string")
    .trim()
    .isIn(["hour", "day", "week", "month"])
    .withMessage("The resource price unit must be 'hour', 'day', 'week', or 'month'"),
];