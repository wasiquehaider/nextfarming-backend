const { Router } = require("express");
const Controller = require("./controller");
const router = Router();

router.get("/", Controller.getFields);
router.post("/", Controller.addField);
router.get("/:id", Controller.getFieldById);
router.put("/:id", Controller.updateField);
router.delete("/:id", Controller.removeField);

module.exports = router;
