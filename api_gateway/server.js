import express from "express";
import cors from "cors";
import userServiceRoutes from "./routes/userServiceRoutes.js";
import assignmentRoutes from "./routes/assignmentServiceRoutes.js";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

class Server {
  constructor(app) {
    this.app = app;
  }
  routes = [
    "userServiceRoutes",
    "assignmentServiceRoutes",
    "classroomServiceRoutes",
  ];

  async start() {
    const port = process.env.PORT || 3000;
    try {
      this.app.use(express.json());
      this.app.use(cors({ origin: "*" }));
      this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

      this.app.use(`/api/v1/userService`, userServiceRoutes);
      this.app.use(`/api/v1/assignmentService`, assignmentRoutes);
      this.app.listen(port, () => {
        console.log(`Server is running on ${port}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  }
}

const app = express();
const initialize = new Server(app);
initialize.start();
