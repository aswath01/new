import { param, body } from "express-validator";
import { Assignment } from "../../model/assignments.js";
let validAssignmentStatus = ["SCHEDULED", "ONGOING"];
const updateAssignmentVs = [
  param("assignId")
    .notEmpty()
    .withMessage("AssignmentId is mandatory")
    .isUUID()
    .custom(async (id) => {
      let assignment = new Assignment();
      let assignmentDetails = await assignment.getAssignmentById(id);
      if (!assignmentDetails) {
        throw new Error("Assignment unavailable");
      }
      return true;
    }),
  body("assignedStudents").optional({ falsy: true }),
  body("description").optional(),
  body("publishedAt").optional(),
  body("deadline").optional(),
  body("assignmentStatus")
    .optional()
    .custom((status) => {
      if (!validAssignmentStatus.includes(status)) {
        throw new Error("Invalid status of the assigment");
      }
      return true;
    }),
];

export { updateAssignmentVs };
