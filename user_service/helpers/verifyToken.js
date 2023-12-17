import jwt from "jsonwebtoken";
import { unauthorized } from "../responses/errorResponses.js";
import dotenv from "dotenv";
dotenv.config();

//validating the token sent by the user
const verfiyToken = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization?.split(" ");
    if (token.length !== 2) return unauthorized(res, "Invalid token format");

    jwt.verify(token[1], secretKey, (err, decoded) => {
      if (err) {
        return unauthorized(res, "Error while parsing token");
      } else {
        if (!decoded) {
          return unauthorized(res, "Cannot decode token");
        }
        req.userId = decoded;
        console.log({ decoded });
        // req.user = decoded;
        // req.user.org = decoded.organisation;
        next();
      }
    });
  } else {
    return unauthorized(res, "Token not found");
  }
};

export default verfiyToken;
