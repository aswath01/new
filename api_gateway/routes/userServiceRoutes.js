import express from "express";
import redirectRequest from "../middleware/redirectRequest.js";
const router = express.Router();
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});
console.log(process.env.USER_SERVICE_URL);

router.post("/login", redirectRequest(`${process.env.USER_SERVICE_URL}/login`));
router.get("/ping", redirectRequest(`${process.env.USER_SERVICE_URL}/ping`));
export default router;
