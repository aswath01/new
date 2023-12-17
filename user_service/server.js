import express from "express";
const app = express();
let port = 3001;
app.use(express.json());
/**
 * routes
 */

/**
 * authenticate, if the user is there {check with the email}
 */
//login

app.use("/login", (await import("./routes/login.js")).default);

app.get("/ping", (req, res) => {
  res.status(200).json({
    service: "User",
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`User service is running on port ${port}`);
});
