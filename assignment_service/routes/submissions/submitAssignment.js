import express from "express";
import verfiyToken from "../../helpers/verifyToken.js";
import { matchedData } from "express-validator";
import { Submissions } from "../../model/submissions.js";
import multer from "multer";
import { uploadSingleFile } from "../../helpers/uploadSingleFile.js";
import { DateTime } from "luxon";
import { response200 } from "../../responses/successResponses.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { submitAssignmentVs } from "../../validation schema/submissons/submitAssignmentVs.js";
import { validateRequest } from "../../helpers/validateRequest.js";
const currentDate = DateTime.local();
let submittedDate = currentDate.toJSDate();
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const submitAssignment = async (req, res) => {
  try {
    const requestData = matchedData(req);
    let submissions = new Submissions();
    const { userId } = req.user;
    console.log({ file: req.file });
    let submissionStatus = "SUBMITTED";
    let { originalname, buffer, mimetype } = req.file;
    const submission = await submissions.submitAssignment(
      requestData.assignmentId,
      userId,
      { originalname, buffer, mimetype, submittedDate, submissionStatus }
    );
    return response200(res, submission);
  } catch (error) {
    console.log({ error });
    return internalServerResponse(res, error);
  }
};

export default router.post(
  "/:assignmentId",
  verfiyToken,
  submitAssignmentVs,
  uploadSingleFile,
  validateRequest,
  submitAssignment
);
