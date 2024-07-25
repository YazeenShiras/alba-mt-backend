const PropertyCard = require("../models/PropertyCard");
const Lead = require("../models/Lead");

const createPropertyCard = async (req, res) => {
  try {
    const { community, building, unitNo } = req.body;
    const { id } = req.params;

    console.log(id);

    const propertyCard = new PropertyCard({
      community,
      building,
      unitNo,
      userId: id,
    });
    await propertyCard.save();

    res.status(201).json({
      message: "property card created successfully",
      status: 200,
      data: propertyCard,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log(error.message);
  }
};

const getPropertyCards = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyCards = await PropertyCard.find({ userId: id }).populate(
      "linkedLeads"
    );

    res.status(200).json({ data: propertyCards, status: 200 });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log(error.message);
  }
};

const updatePropertyCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePropertyCard = await PropertyCard.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(201).json({
      message: "property card updated",
      status: 200,
      data: updatePropertyCard,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deletePropertyCard = async (req, res) => {
  try {
    const { id } = req.params;
    await PropertyCard.findByIdAndDelete(id);
    res.status(201).json({ message: "property card deleted", status: 200 });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const linkLead = async (req, res) => {
  try {
    const { propertyId, leadId } = req.body;

    const propertyCard = await PropertyCard.findById(propertyId);

    propertyCard.linkedLeads = leadId;
    const result = await propertyCard.save();

    res.status(201).json({ data: result, status: 200 });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log(error.message);
  }
};

module.exports = {
  createPropertyCard,
  getPropertyCards,
  updatePropertyCard,
  deletePropertyCard,
  linkLead,
};
