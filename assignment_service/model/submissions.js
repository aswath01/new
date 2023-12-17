import { db } from "../db/databaseConnection.js";
class Submissions {
  constructor() {}
  async createSubmissionsData(
    assignedStudents,
    assigmentId,
    deadline,
    submissionStatus
  ) {
    try {
      let values = [];
      console.log(submissionStatus);
      let generateSubmissionsResponse = [];
      assignedStudents.forEach(async (studentId) => {
        const query = `
      INSERT INTO submission (assignmentid, studentId, is_active, deadline, submissionstatus)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
        values = [assigmentId, studentId, true, deadline, submissionStatus];
        let generateSubmissions = await db.query(query, values);
        console.log(generateSubmissions.rows[0]);
        generateSubmissionsResponse.push(generateSubmissions);
      });
      console.log(generateSubmissionsResponse);
      return generateSubmissionsResponse;
    } catch (error) {
      console.error("Error in submmissons:", error);
      throw new Error("Error creating assignment");
    }
  }
  async getSubmissionByAssignmentId(assigmentId, studentId) {
    try {
      const query = `SELECT * FROM submission WHERE assignmentid=$1 AND studentid=$2`;
      let values = [assigmentId, studentId];
      const submissionData = await db.query(query, values);
      return submissionData.rows[0];
    } catch (error) {}
  }
  async getSubmissonById(id) {
    try {
      const query = `SELECT * FROM submisson WHERE id = $1`;
      let submission = await db.query(query, [id]);
      submission = submission.rows[0];
      return submission;
    } catch (error) {
      return null;
    }
  }
  async submitAssignment(assignmentId, studentId, requestData) {
    try {
      const query = `
      UPDATE submission
      SET
        document_content = $1,
        document_name = $2,
        document_type = $3,
        submitted_date = $4,
        submissionstatus = $5
      WHERE
        assignmentid = $6 AND studentid = $7
      RETURNING *`;
      const values = [
        requestData.buffer,
        requestData.originalname,
        requestData.mimetype,
        requestData.submittedDate,
        requestData.submissionStatus,
        assignmentId,
        studentId,
      ];
      let updateAssignmentResponse = await db.query(query, values);
      console.log({ updateAssignmentResponse });
      return updateAssignmentResponse.rows[0];
    } catch (error) {
      console.error("Error in updateAssignment:", error);
      throw new Error("Error updating assignment");
    }
  }
  async deleteAssignment(id) {
    try {
      const query = `
      UPDATE  assignments
      SET
       is_active = $2
      WHERE
        id = $1
      RETURNING *`;
      let values = [id, false];
      const deleteResponse = await db.query(query, values);
      return deleteResponse.rows[0];
    } catch (error) {
      console.error("Error in deleteAssignmentById:", error);
      throw new Error("Error deleting assignment");
    }
  }
  async getAssignments(id, role) {
    try {
      let filterQuery = ``;
      if (role === "tutor") {
        filterQuery = `WHERE createdBy = $1`;
      } else if (role === "student") {
        filterQuery = `WHERE $1 IN( SELECT unnest(assignedTo))`;
      }
      const query = `SELECT * FROM assignments ${filterQuery}`;
      let values = [id];
      const assigments = await db.query(query, values);
      return assigments.rows;
    } catch (error) {
      return null;
    }
  }
  async getSubmissions(userId, role, assignmentId) {
    try {
      let filterQuery = "";
      let values = [assignmentId];
      if (role === "tutor") {
        filterQuery = "WHERE assignmentid = $1";
      }
      if (role === "student") {
        filterQuery = "WHERE assignmentid = $1 AND studentid = $2";
        values.push(userId);
      }
      const query = `SELECT * FROM submission ${filterQuery}`;
      const submissionDetails = await db.query(query, values);
      return submissionDetails.rows;
    } catch (error) {
      console.log("error fetching data");
      throw error;
    }
  }
}

export { Submissions };
