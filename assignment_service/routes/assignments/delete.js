import express from "express";
import { deleteAssignmentVs } from "../../validation schema/assignments/deleteAssignmentVs.js";
import { validateRequest } from "../../helpers/validateRequest.js";
import verfiyToken from "../../helpers/verifyToken.js";
import { matchedData } from "express-validator";
import { Assignment } from "../../model/assignments.js";
import { response200 } from "../../responses/successResponses.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
import { unauthorized } from "../../responses/errorResponses.js";

const router = express.Router();

const deleteAssignment = async (req, res) => {
  try {
    const requestData = matchedData(req);

    const { role } = req.user;
    if (role !== "tutor") {
      return unauthorized(res, "Unauthorised");
    }
    const assignment = new Assignment();
    const deleteResponse = await assignment.deleteAssignment(
      requestData.assignId
    );
    return response200(res, "deleted sucessfully");
  } catch (error) {
    console.log({ error });
    return internalServerResponse(res, error);
  }
};
export default router.delete(
  "/:assignId",
  verfiyToken,
  deleteAssignmentVs,
  validateRequest,
  deleteAssignment
);
