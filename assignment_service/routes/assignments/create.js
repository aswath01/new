import express from "express";
import { createAssignmentVs } from "../../validation schema/assignments/createAssignmentsVs.js";
import { validateRequest } from "../../helpers/validateRequest.js";
import verfiyToken from "../../helpers/verifyToken.js";
import { matchedData } from "express-validator";
import { unauthorized } from "../../responses/errorResponses.js";
import { response200 } from "../../responses/successResponses.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { Assignment } from "../../model/assignments.js";
import { DateTime } from "luxon";
import { Submissions } from "../../model/submissions.js";

const router = express.Router();

const createAssignment = async (req, res) => {
  try {
    const currentDate = DateTime.local();
    let c = currentDate.toJSDate();
    let requestData = matchedData(req);
    const assigment = new Assignment();
    const { role, userId } = req.user;
    let createdBy = userId;
    if (role !== "tutor") {
      return unauthorized(res, "Not authorised");
    }
    requestData = {
      ...requestData,
      createdBy,
    };
    const createdResponse = await assigment?.createAssignment(requestData);
    if (!createdResponse) {
    }
    /**
     * create submissions for the student assgined to the assignment
     */
    let submissions = new Submissions();
    console.log({ requestData });
    const submission = await submissions.createSubmissionsData(
      requestData.assignedStudents,
      createdResponse.id,
      requestData.deadline,
      "PENDING"
    );
    return response200(res, createdResponse);
  } catch (error) {
    console.log({ error });
    return internalServerResponse(res, error);
  }
};

export default router.post(
  "/",
  verfiyToken,
  createAssignmentVs,
  validateRequest,
  createAssignment
);
