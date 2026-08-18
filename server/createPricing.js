require('dotenv').config();
const mongoose = require('mongoose');
const PricingConfig = require('./models/PricingConfig');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

  await PricingConfig.insertMany([
    {
      name: "base_cost",
      value: 5000,
      unit: "flat",
      active: true
    },
    {
      name: "roof_area_cost",
      value: 5,
      unit: "sqft",
      active: true
    },
    {
      name: "metal_roof_upgrade",
      value: 2000,
      unit: "flat",
      active: true
    },
    {
      name: "labor_cost",
      value: 3000,
      unit: "flat",
      active: true
    }
  ]);

  console.log("Pricing data created successfully");
  process.exit();

})
.catch(err => {
  console.log(err);
  process.exit();
});