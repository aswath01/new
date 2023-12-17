import express from "express";
import verfiyToken from "../../helpers/verifyToken.js";
import { getAssignmentsVs } from "../../validation schema/assignments/getAssignmentVs.js";
import { validateRequest } from "../../helpers/validateRequest.js";
import { matchedData } from "express-validator";
import { Submissions } from "../../model/submissions.js";
import { response200 } from "../../responses/successResponses.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";

const router = express.Router();

const getSubmissions = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { userId, role } = req.user;
    const submisson = new Submissions();
    let submissions = await submisson.getSubmissions(
      userId,
      role,
      requestData.assignmentId
    );
    console.log({ submissions });
    submissions = submissions.map((sub) => {
      return {
        id: sub.id,
        assignmentId: sub.assignmentId,
        studentId: sub.studentId,
        is_active: sub.is_active,
        deadline: sub.deadline,
        submissionstatus: sub.submissionstatus,
        // document_content: sub.document_content, :
        document_name: sub.document_name,
        document_type: sub.document_type,
        submitted_date: sub.submitted_date,
      };
    });

    return response200(res, submissions);
  } catch (error) {
    console.log({ error });
    return internalServerResponse(res, error);
  }
};

export default router.get(
  "/:assignmentId",
  verfiyToken,
  getAssignmentsVs,
  validateRequest,
  getSubmissions
);
