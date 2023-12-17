import express from "express";

import redirectRequest from "../middleware/redirectRequest.js";
import { uploadSingleFile } from "../../assignment_service/helpers/uploadSingleFile.js";
const router = express.Router();

router.post(
  "/create",
  redirectRequest(`${process.env.ASSIGNMENT_SERVICE_URL}/create`)
);

router.patch(
  "/update/:assignId",
  redirectRequest(`${process.env.ASSIGNMENT_SERVICE_URL}/update`)
);

router.delete(
  "/delete/:assignId",
  redirectRequest(`${process.env.ASSIGNMENT_SERVICE_URL}/delete`)
);

router.get(
  "/get",
  redirectRequest(`${process.env.ASSIGNMENT_SERVICE_URL}/get`)
);

/**
 * submit addignment
 */

router.post(
  "/submitAssignment/:assignmentId",
  uploadSingleFile,
  redirectRequest(`${process.env.ASSIGNMENT_SERVICE_URL}/submitAssignment`)
);

router.get(
  "/getSubmissionsByAssignmentId/:assignmentId",
  redirectRequest(
    `${process.env.ASSIGNMENT_SERVICE_URL}/getSubmissionsByAssignmentId`
  )
);
router.get(
  "/ping",
  redirectRequest(`${process.env.ASSIGNMENT_SERVICE_URL}/ping`)
);

export default router;
