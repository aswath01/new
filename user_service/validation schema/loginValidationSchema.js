import { query, body } from "express-validator";
import { passwordRegex } from "../helpers/regex.js";
let validRoles = ["tutor", "student"];
const loginVs = [
  query("role")
    .notEmpty()
    .withMessage("role is mandatory")
    .custom((role) => {
      if (!validRoles.includes(role)) {
        throw new Error("Invalid role, It can be either tutor or student.");
      }
      return true;
    }),
  body("userName").notEmpty().withMessage("user name is mandatory"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .custom((password) => {
      if (!passwordRegex.test(password)) {
        throw new Error("password is not strong enough.");
      }
      return true;
    }),
];

export { loginVs };
