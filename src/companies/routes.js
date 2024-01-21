const { Router } = require("express");
const Controller = require("./controller");
const router = Router();

router.get("/", Controller.getCompanies);
router.post("/", Controller.addCompany);
router.get("/:id", Controller.getCompanyById);
router.put("/:id", Controller.updateCompany);
router.delete("/:id", Controller.removeCompany);

module.exports = router;
