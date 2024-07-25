const express = require("express");

const { createLead, getLeads, getLead } = require("../controllers/lead");

const router = express.Router();

router.get("/:id", getLeads);
router.post("/:id", createLead);
router.get("/lead/:id", getLead);

module.exports = router;
