import express from "express";
import compression from "compression";
const app = express();
let port = 3003;
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * routes
 */

/**
 * authenticate, if the user is there {check with the email}
 */
//login
/**
 * assignment
 */
app.use("/create", (await import("./routes/assignments/create.js")).default);

app.use("/update", (await import("./routes/assignments/update.js")).default);

app.use("/delete", (await import("./routes/assignments/delete.js")).default);

app.use("/get", (await import("./routes/assignments/get.js")).default);

/**
 * submissions
 */
app.use(
  "/submitAssignment",
  (await import("./routes/submissions/submitAssignment.js")).default
);
app.use(
  "/getSubmissionsByAssignmentId",
  (await import("./routes/submissions/getSubmissions.js")).default
);
app.get("/ping", (req, res) => {
  res.status(200).json({
    service: "User",
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`Assignment service is running on port ${port}`);
});
