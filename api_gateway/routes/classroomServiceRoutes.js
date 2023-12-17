import express from "express";

import redirectRequest from "../middleware/redirectRequest.js";
const router = express.Router();

router.get(
  "/ping",
  redirectRequest(`${process.env.CLASSROOM_SERVICE_URL}/ping`)
);
export default router;
