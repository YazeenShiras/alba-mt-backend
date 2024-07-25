const express = require("express");

const {
  createPropertyCard,
  getPropertyCards,
  updatePropertyCard,
  deletePropertyCard,
  linkLead,
} = require("../controllers/property");

const router = express.Router();

router.post("/linkLead", linkLead);
router.post("/:id", createPropertyCard);
router.get("/:id", getPropertyCards);
router.put("/:id", updatePropertyCard);
router.delete("/:id", deletePropertyCard);

module.exports = router;
