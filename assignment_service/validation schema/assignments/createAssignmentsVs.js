import { body } from "express-validator";
let validAssignmentStatus = ["SCHEDULED", "ONGOING"];
const createAssignmentVs = [
  body("assignedStudents")
    .notEmpty()
    .withMessage("Assigning students is mandatory"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("publishedAt").notEmpty(),
  body("deadline").notEmpty(),
  body("assignmentStatus")
    .notEmpty()
    .custom((status) => {
      if (!validAssignmentStatus.includes(status)) {
        throw new Error("Invalid status of the assigment");
      }
      return true;
    }),
];

export { createAssignmentVs };
