import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});
export async function generateToken(data) {
  // let uid = uuidv4();
  let token = jwt.sign(
    { userId: data.id, name: data?.username, role: data?.role },
    process.env.AUTHENTICATE_FB_KEY,
    {
      expiresIn: "3600s",
    }
  );
  return token;
}
