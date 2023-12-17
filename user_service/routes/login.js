import express from "express";
import { validateRequest } from "../helpers/validateRequest.js";
import { loginVs } from "../validation schema/loginValidationSchema.js";
import { matchedData } from "express-validator";
import { users } from "../model/users.js";
import { generateToken } from "../helpers/generateToken.js";
import { response200 } from "../responses/successResponses.js";
import { internalServerResponse } from "../responses/serverErrorResponses.js";
const router = express.Router();

const login = async (req, res) => {
  try {
    const requestData = matchedData(req);
    let user = new users();
    const { userName, password, role } = requestData;
    let userData = await user.getUserByName(userName, role);
    let date = Date.now();
    if (!userData) {
      userData = await user.createUser({ userName, role, date });
    }
    const authToken = await generateToken(userData);
    return response200(res, authToken);
  } catch (error) {
    console.log("Error in Login", error);
    return internalServerResponse(res, {
      error: `Unable to login`,
    });
  }
};

export default router.post("/", loginVs, validateRequest, login);
