const mongoose = require('mongoose');

const pricingConfigSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    value: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: 'flat',
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'PricingConfig',
  pricingConfigSchema
);