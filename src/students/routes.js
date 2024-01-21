const { Router } = require("express");
const Controller = require("./controller");
const router = Router();

router.get("/", Controller.getStudents);
router.post("/", Controller.addStudent);
router.get("/:id", Controller.getStudentById);
router.put("/:id", Controller.updateStudent);
router.delete("/:id", Controller.removeStudent);

module.exports = router;
