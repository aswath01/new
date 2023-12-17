import { param } from "express-validator";
import { Assignment } from "../../model/assignments.js";
import { Submissions } from "../../model/submissions.js";

const submitAssignmentVs = [
  param("assignmentId")
    .isUUID()
    .notEmpty()
    .withMessage("submisson Id is mandatory")
    .custom(async (id, { req }) => {
      let submission = new Submissions();
      let submissionDetails = await submission.getSubmissionByAssignmentId(
        id,
        req.user.userId
      );
      if (!submissionDetails) {
        throw new Error("No submissons found");
      }
      console.log(submissionDetails);
      if (submissionDetails?.submissionstatus === "SUBMITTED") {
        throw new Error("Submitted already");
      }
      return true;
    }),
];
export { submitAssignmentVs };
