const Lead = require("../models/Lead");

const getLeads = async (req, res) => {
  try {
    const { id } = req.params;

    const leads = await Lead.find({ userId: id });
    res.status(201).json({
      data: leads,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, contactInfo } = req.body;
    const { id } = req.params;

    const lead = new Lead({ name, contactInfo, userId: id });
    await lead.save();

    res.status(201).json({
      message: "lead created successfully",
      status: 200,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getLead = (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { id } = req.params;
    console.log(id);
    const lead = Lead.findById(id);
    console.log(lead);
    if (lead) {
      res.status(201).json({
        data: lead,
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getLeads, createLead, getLead };
