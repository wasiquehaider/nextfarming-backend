const { Router } = require("express");
const Controller = require("./controller");
const router = Router();

router.get("/", Controller.getRecords);
router.post("/", Controller.addRecord);
router.get("/:id", Controller.getRecordById);
router.put("/:id", Controller.updateRecord);
router.delete("/:id", Controller.removeRecord);

module.exports = router;
