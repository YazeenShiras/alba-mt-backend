const { model, Schema } = require("mongoose");

const leadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});

module.exports = model("Lead", leadSchema);
