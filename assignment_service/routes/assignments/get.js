import express from "express";
import verfiyToken from "../../helpers/verifyToken.js";
import { matchedData } from "express-validator";
import { Assignment } from "../../model/assignments.js";
import { response200 } from "../../responses/successResponses.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { assignmentFeedVs } from "../../validation schema/assignments/assignmentFeedVs.js";
import { validateRequest } from "../../helpers/validateRequest.js";
const router = express.Router();

const getAssignments = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let assigment = new Assignment();
    const requestData = matchedData(req);
    const { publishedAt, assignmentStatus, status } = requestData;
    let assigments = await assigment.getAssignments(
      userId,
      role,
      publishedAt,
      assignmentStatus,
      status.toUpperCase()
    );
    let data = assigments.map((element) => {
      return {
        ...element,
        publishedAt: {
          date: element?.publishedat,
          assignmentstatus: element?.assignmentstatus,
        },
      };
    });
    return response200(res, { role, data });
  } catch (error) {
    console.log({ error });
    return internalServerResponse(res, error);
  }
};

export default router.get(
  "/",
  verfiyToken,
  assignmentFeedVs,
  validateRequest,
  getAssignments
);
