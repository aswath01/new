import { param } from "express-validator";
import { Assignment } from "../../model/assignments.js";

const deleteAssignmentVs = [
  param("assignId")
    .notEmpty()
    .withMessage("assignemt Id is mandatory")
    .custom(async (id) => {
      let assigment = new Assignment();
      const assigmentData = await assigment.getAssignmentById(id);
      if (!assigmentData) {
        throw new Error("Assignment unavailabel");
      }
      return true;
    }),
];
export { deleteAssignmentVs };
