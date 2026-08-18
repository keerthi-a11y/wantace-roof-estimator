const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema(
  {
    roof_type: {
      type: String,
      required: true,
    },

    roof_size: {
      type: String,
      required: true,
    },

    roofing_material: {
      type: String,
      required: true,
    },

    roof_condition: {
      type: String,
      required: true,
    },

    project_timeline: {
      type: String,
      required: true,
    },

    estimatedCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Estimate',
  estimateSchema
);