const express = require('express');
const PricingConfig = require('../models/PricingConfig');
const requireOwnerAuth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all pricing configuration
router.get('/', requireOwnerAuth, async (req, res) => {
  try {
    const pricing = await PricingConfig.find()
      .sort({ name: 1 });

    res.json({
      success: true,
      pricing,
    });
  } catch (error) {
    console.error('Pricing fetch error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing configuration',
    });
  }
});

// Update a pricing configuration
router.put('/:id', requireOwnerAuth, async (req, res) => {
  try {
    const { value, unit, active } = req.body;

    const pricing = await PricingConfig.findByIdAndUpdate(
      req.params.id,
      {
        ...(value !== undefined && { value }),
        ...(unit !== undefined && { unit }),
        ...(active !== undefined && { active }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: 'Pricing configuration not found',
      });
    }

    res.json({
      success: true,
      message: 'Pricing updated successfully',
      pricing,
    });
  } catch (error) {
    console.error('Pricing update error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update pricing',
    });
  }
});

module.exports = router;