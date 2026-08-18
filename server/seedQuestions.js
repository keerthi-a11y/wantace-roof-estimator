const mongoose = require('mongoose');
require('dotenv').config();

const Question = require('./models/Question');

const questions = [
  {
    key: 'roof_type',
    label: 'What type of roof do you have?',
    type: 'select',
    options: ['Gable', 'Hip', 'Flat', 'Other'],
    required: true,
    order: 1,
  },
  {
    key: 'roof_size',
    label: 'What is the approximate roof size?',
    type: 'select',
    options: ['Small', 'Medium', 'Large'],
    required: true,
    order: 2,
  },
  {
    key: 'roofing_material',
    label: 'What type of roofing material do you prefer?',
    type: 'select',
    options: ['Asphalt Shingles', 'Metal', 'Tile', 'Other'],
    required: true,
    order: 3,
  },
  {
    key: 'roof_condition',
    label: 'What is the current condition of your roof?',
    type: 'select',
    options: ['Good', 'Needs Repair', 'Needs Replacement'],
    required: true,
    order: 4,
  },
  {
    key: 'project_timeline',
    label: 'When are you planning to start the roofing project?',
    type: 'select',
    options: [
      'Immediately',
      'Within 1 Month',
      'Within 3 Months',
      'Just Exploring',
    ],
    required: true,
    order: 5,
  },
];

async function seedQuestions() {
  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected successfully');

    await Question.deleteMany({});

    console.log('Old questions removed');

    const insertedQuestions = await Question.insertMany(questions);

    console.log(
      `${insertedQuestions.length} questions inserted successfully`
    );

    await mongoose.connection.close();

    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding questions:', error.message);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
}

seedQuestions();