import { query } from "express-validator";
const assignmentFeedVs = [
  query("publishedAt").optional(),
  query("assignmentStatus").optional(),
  query("status").optional(),
];
export { assignmentFeedVs };
