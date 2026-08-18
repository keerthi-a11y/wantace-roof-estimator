const express = require('express');
const Estimate = require('../models/Estimate');

const router = express.Router();

/*
  POST /api/estimate
  Calculate and save roofing estimate
*/
router.post('/', async (req, res) => {
  try {
    const {
      roof_type,
      roof_size,
      roofing_material,
      roof_condition,
      project_timeline,
    } = req.body;

    // Validate required fields
    if (
      !roof_type ||
      !roof_size ||
      !roofing_material ||
      !roof_condition ||
      !project_timeline
    ) {
      return res.status(400).json({
        success: false,
        message: 'All questions are required',
      });
    }

    // Roof size prices
    const sizePrices = {
      Small: 5000,
      Medium: 10000,
      Large: 18000,
    };

    // Roofing material prices
    const materialPrices = {
      'Asphalt Shingles': 0,
      Metal: 5000,
      Tile: 8000,
      Other: 3000,
    };

    // Roof condition prices
    const conditionPrices = {
      Good: 0,
      'Needs Repair': 4000,
      'Needs Replacement': 8000,
    };

    const basePrice = sizePrices[roof_size] || 0;
    const materialPrice = materialPrices[roofing_material] || 0;
    const conditionPrice = conditionPrices[roof_condition] || 0;

    const estimatedCost =
      basePrice + materialPrice + conditionPrice;

    // Save estimate to MongoDB
    const newEstimate = await Estimate.create({
      roof_type,
      roof_size,
      roofing_material,
      roof_condition,
      project_timeline,
      estimatedCost,
    });

    // Send result to frontend
    res.status(201).json({
      success: true,
      message: 'Estimate calculated and saved successfully',
      estimate: {
        id: newEstimate._id,
        roofType: newEstimate.roof_type,
        roofSize: newEstimate.roof_size,
        roofingMaterial: newEstimate.roofing_material,
        roofCondition: newEstimate.roof_condition,
        projectTimeline: newEstimate.project_timeline,
        estimatedCost: newEstimate.estimatedCost,
        createdAt: newEstimate.createdAt,
      },
    });
  } catch (error) {
    console.error('Estimate error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to calculate estimate',
    });
  }
});


/*
  GET /api/estimate
  Get all estimate history
*/
router.get('/', async (req, res) => {
  try {
    const estimates = await Estimate.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: estimates.length,
      estimates,
    });
  } catch (error) {
    console.error('History error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch estimate history',
    });
  }
});


/*
  GET /api/estimate/:id
  Get one estimate by ID
*/
router.get('/:id', async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id);

    if (!estimate) {
      return res.status(404).json({
        success: false,
        message: 'Estimate not found',
      });
    }

    res.json({
      success: true,
      estimate,
    });
  } catch (error) {
    console.error('Single estimate error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch estimate',
    });
  }
});


module.exports = router;