// Bring Mongoose connection and Trip model
require('./db');
const mongoose = require('mongoose');
const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');
const path = require('path');
const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/trips.json'), 'utf8')
);

// Delete any existing records, then insert seed data
const seedDatabase = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
