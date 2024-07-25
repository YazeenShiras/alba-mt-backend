const { model, Schema } = require("mongoose");

const propertyCardSchema = new Schema({
  community: {
    type: String,
    enum: ["CommunityA", "CommunityB"],
    required: true,
  },
  building: {
    type: String,
    enum: ["Building1", "Building2"],
    required: true,
  },
  unitNo: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  linkedLeads: {
    type: String,
    ref: "Lead",
  },
});

module.exports = model("PropertyCard", propertyCardSchema);
