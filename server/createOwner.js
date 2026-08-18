require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Owner = require('./models/Owner');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await Owner.create({
    username: 'admin',
    password: hashedPassword
  });

  console.log('Owner created successfully');
  process.exit();
})
.catch(err => {
  console.log(err);
  process.exit();
});