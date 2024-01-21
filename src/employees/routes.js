const { Router } = require("express");
const Controller = require("./controller");
const router = Router();

router.get("/", Controller.getEmployees);
router.post("/", Controller.addEmployee);
router.get("/:id", Controller.getEmployeeById);
router.put("/:id", Controller.updateEmployee);
router.delete("/:id", Controller.removeEmployee);

module.exports = router;
