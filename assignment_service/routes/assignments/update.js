import express from "express";
import { updateAssignmentVs } from "../../validation schema/assignments/updateAssignmentVs.js";
import verfiyToken from "../../helpers/verifyToken.js";
import { matchedData } from "express-validator";
import { validateRequest } from "../../helpers/validateRequest.js";
import { Assignment } from "../../model/assignments.js";
import { unauthorized } from "../../responses/errorResponses.js";
import { response200 } from "../../responses/successResponses.js";
import { internalServerResponse } from "../../responses/serverErrorResponses.js";
const router = express.Router();

const update = async (req, res) => {
  try {
    const requestData = matchedData(req);
    const { role } = req.user;
    if (role !== "tutor") {
      return unauthorized(res, "Not authorised");
    }
    let assigment = new Assignment();
    const data = await assigment.updateAssignmentById(
      requestData.assignId,
      requestData
    );
    return response200(res, data);
  } catch (error) {
    console.log("Error in updating assignment", error);
    return internalServerResponse(res, error);
  }
};
export default router.patch(
  "/:assignId",
  verfiyToken,
  updateAssignmentVs,
  validateRequest,
  update
);
