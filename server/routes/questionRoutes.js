const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ order: 1 });

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
    });
  }
});

module.exports = router;