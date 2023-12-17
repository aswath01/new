import { DateTime } from "luxon";
import { db } from "../db/databaseConnection.js";
class Assignment {
  constructor(assigment) {
    assigment = this.assigment;
  }
  async getAssignmentById(id) {
    try {
      const query = `SELECT * FROM assignments WHERE id = $1`;
      let assigment = await db.query(query, [id]);
      assigment = assigment.rows[0];
      return assigment;
    } catch (error) {
      return null;
    }
  }
  async createAssignment(assignment) {
    try {
      const query = `
      INSERT INTO assignments (createdBy, assignedTo, description, publishedAt, deadline, assignmentStatus)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
      const values = [
        assignment.createdBy,
        assignment.assignedStudents,
        assignment.description,
        new Date(assignment?.publishedAt),
        new Date(assignment?.deadline),
        assignment?.assignmentStatus,
      ];

      let createAssignmentResponse = await db.query(query, values);
      return createAssignmentResponse.rows[0];
    } catch (error) {
      console.error("Error in createAssignment:", error);
      throw new Error("Error creating assignment");
    }
  }
  async updateAssignmentById(assignmentId, requestData) {
    try {
      const query = `
      UPDATE assignments
      SET
        description = $1,
        publishedAt = $2,
        deadline = $3,
        assignmentStatus = $4
      WHERE
        id = $5
      RETURNING *`;

      const values = [
        requestData?.description,
        new Date(requestData?.publishedAt),
        new Date(requestData?.deadline),
        requestData?.assignmentStatus,
        assignmentId,
      ];
      let updateAssignmentResponse = await db.query(query, values);
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

  async getAssignments(id, role, publishedAt, assignmentStatus, status) {
    try {
      let values = [id];
      let filterConditions = [];
      /**
       * automatically return based on the role.
       */
      if (role === "tutor") {
        filterConditions.push("a.createdBy = $1");
      } else if (role === "student") {
        filterConditions.push("$1 IN (SELECT unnest(assignedTo))");
      }

      /**
       * submission status
       */
      if (status === "ALL") {
      } else if (status === "OVERDUE") {
        const currentDate = DateTime.local();
        let today = currentDate.toJSDate();
        filterConditions.push("(a.deadline < $2 OR a.deadline IS NULL)");
        values.push(today);
      } else if (status === "PENDING" || "SUBMITTED") {
        filterConditions.push(`s.submissionstatus = $2`);
        values.push(status);
      }
      if (publishedAt) {
        const formattedPublishedAt = new Date(publishedAt)
          .toISOString()
          .split("T")[0];
        filterConditions.push("(a.publishedAt IS NULL OR a.publishedAt = $3)");
        values.push(formattedPublishedAt);
      }

      const filterQuery =
        filterConditions.length > 0
          ? `WHERE ${filterConditions.join(" AND ")}`
          : "";
      console.log({ filterQuery });
      let query = `SELECT a.*, s.id as submission_id, s.assignmentId, s.studentId, s.is_active, s.deadline,
        s.submissionstatus, s.document_name, s.document_type, s.submitted_date
       FROM assignments a
     LEFT JOIN submission s ON a.id = s.assignmentId ${filterQuery}`;
      const assignments = await db.query(query, values);
      console.log({ assignments });
      return assignments.rows;
    } catch (error) {
      console.log({ error });
    }
  }
  // async getAssignments(id, role, publishedAt, assignmentStatus, status) {
  //   try {
  //     let statusQuery = "";

  //     console.log({ id, role, publishedAt, assignmentStatus, status });
  //     let values = [id];
  //     let filterConditions = [];

  //     if (role === "tutor") {
  //       filterConditions.push("a.createdBy = $1");
  //     } else if (role === "student") {
  //       filterConditions.push("$1 IN (SELECT unnest(assignedTo))");
  //     }

  //     if (status === "all") {
  //       statusQuery = `AND s.submissionstatus IN ('PENDING', 'SUBMITTED')`;
  //     } else if (status === "overdue") {
  //       const today = new Date().toISOString().split("T")[0];
  //       filterConditions.push("(a.deadline < $2 OR a.deadline IS NULL)");

  //       values.push(today);
  //     } else {
  //       filterConditions.push(
  //         "EXISTS (SELECT 1 FROM submission s WHERE s.assignmentId = a.id AND s.submissionstatus ~* $2)"
  //       );
  //       values.push(`^${status}`);
  //     }

  //     if (assignmentStatus) {
  //       filterConditions.push(
  //         "(a.assignmentStatus IS NULL OR a.assignmentStatus ~* $3)"
  //       );
  //       values.push(`^${assignmentStatus}`);
  //     }

  //     if (publishedAt) {
  //       const formattedPublishedAt = new Date(publishedAt)
  //         .toISOString()
  //         .split("T")[0];
  //       filterConditions.push("(a.publishedAt IS NULL OR a.publishedAt = $4)");
  //       values.push(formattedPublishedAt);
  //     }

  //     const filterQuery =
  //       filterConditions.length > 0
  //         ? `WHERE ${filterConditions.join(" AND ")}`
  //         : "";

  //     const query = `
  //     SELECT a.*, s.id as submission_id, s.assignmentId, s.studentId, s.is_active, s.deadline,
  //            s.submissionstatus, s.document_name, s.document_type, s.submitted_date
  //     FROM assignments a
  //     LEFT JOIN submission s ON a.id = s.assignmentId
  //     ${filterQuery} ${statusQuery}`;
  //     const assignments = await db.query(query, values);
  //     return assignments.rows;
  //   } catch (error) {
  //     console.log({ error });
  //     return null;
  //   }
  // }
}

export { Assignment };
