import { db } from "../db/databaseConnection.js";
class users {
  constructor() {}
  async getUserByName(userName, role) {
    try {
      const query = `SELECT * FROM users WHERE userName = $1 AND role = $2`;
      let user = await db.query(query, [userName, role]);
      user = user.rows[0];
      return user;
    } catch (error) {
      return null;
    }
  }
  async createUser(user) {
    try {
      const query = `INSERT INTO users (userName, role, date_created) VALUES ($1, $2, $3) RETURNING *`;
      const values = [user?.userName, user?.role, new Date(user?.date)];
      let createUserResponse = await db.query(query, values);
      console.log(createUserResponse.rows[0]);
      return createUserResponse.rows[0];
    } catch (error) {
      console.error("Error in createUser:", error);
      throw new Error("error");
    }
  }
}

export { users };
