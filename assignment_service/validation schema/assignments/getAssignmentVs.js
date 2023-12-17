import { param } from "express-validator";
import { Assignment } from "../../model/assignments.js";
const getAssignmentsVs = [
  param("assignmentId")
    .isUUID()
    .notEmpty()
    .custom((id) => {
      const assigment = new Assignment();
      if (!assigment.getAssignmentById(id)) {
        throw new Error("Assignment not found");
      }
      return true;
    }),
];
export { getAssignmentsVs };
