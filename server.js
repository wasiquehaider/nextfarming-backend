const express = require("express");
const studentRoutes = require("./src/students/routes");
const machineRoutes = require("./src/machines/routes");
const companyRoutes = require("./src/companies/routes");
const fieldRoutes = require("./src/fields/routes");
const employeeRoutes = require("./src/employees/routes");
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello PostgreSQL");
});

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/machines", machineRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/fields", fieldRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.listen(port, () => {
  console.log(`App is listening on PORT ${port}`);
});
