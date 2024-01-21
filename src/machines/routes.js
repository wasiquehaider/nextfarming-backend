const { Router } = require("express");
const Controller = require("./controller");
const router = Router();

router.get("/", Controller.getMachines);
router.post("/", Controller.addMachine);
router.get("/:id", Controller.getMachineById);
router.put("/:id", Controller.updateMachine);
router.delete("/:id", Controller.removeMachine);

module.exports = router;
