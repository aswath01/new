import jwt from "jsonwebtoken";
import { unauthorized } from "../responses/errorResponses.js";
import dotenv from "dotenv";
dotenv.config();

//validating the token sent by the user
const verfiyToken = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const { usertoken } = req.headers;
  if (usertoken) {
    const token = usertoken?.split(" ");
    jwt.verify(token[0], secretKey, (err, decoded) => {
      if (err) {
        console.log({ err });
        return unauthorized(res, `Error while parsing token : ${err.message}`);
      } else {
        if (!decoded) {
          return unauthorized(res, "Cannot decode token");
        }
        req.user = decoded;
        next();
      }
    });
  } else {
    return unauthorized(res, "Token not found");
  }
};

export default verfiyToken;
