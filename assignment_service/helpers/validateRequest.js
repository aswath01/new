import { validationResult } from "express-validator";
import { badRequest } from "../responses/errorResponses.js";

const validateRequest = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else {
    return badRequest(res, result.array());
  }
};

export { validateRequest };
