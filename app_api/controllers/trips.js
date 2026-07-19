const mongoose = require('mongoose');

require('../models/travlr');

const Model = mongoose.model('trips');

const validateTrip = (trip) => {
  const errors = [];

  if (!trip.code || !/^[A-Za-z0-9]{3,10}$/.test(trip.code)) {
    errors.push(
      'Trip code is required and must contain 3 to 10 letters or numbers.'
    );
  }

  if (!trip.name || trip.name.trim().length < 3) {
    errors.push('Trip name must be at least 3 characters.');
  }

  if (!trip.length || trip.length.trim().length < 2) {
    errors.push('Trip length must be at least 2 characters.');
  }

  if (!trip.start || Number.isNaN(new Date(trip.start).getTime())) {
    errors.push('A valid start date is required.');
  }

  if (!trip.resort || trip.resort.trim().length < 2) {
    errors.push('Resort name must be at least 2 characters.');
  }

  const price = Number(trip.perPerson);

  if (!Number.isFinite(price) || price <= 0) {
    errors.push('Price per person must be greater than zero.');
  }

  if (
    !trip.image ||
    !/^.+\.(jpg|jpeg|png|webp)$/i.test(trip.image.trim())
  ) {
    errors.push(
      'Image name must end in .jpg, .jpeg, .png, or .webp.'
    );
  }

  if (
    !trip.description ||
    trip.description.trim().length < 10
  ) {
    errors.push('Description must be at least 10 characters.');
  }

  return errors;
};

const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: 'No trips found.'
      });
    }

    return res.status(200).json(trips);
  } catch (error) {
    console.error('Unable to retrieve trips:', error);

    return res.status(500).json({
      message: 'Unable to retrieve trips.'
    });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({
      code: req.params.tripCode
    }).exec();

    if (!trip) {
      return res.status(404).json({
        message: 'Trip not found.'
      });
    }

    return res.status(200).json([trip]);
  } catch (error) {
    console.error('Unable to retrieve trip:', error);

    return res.status(500).json({
      message: 'Unable to retrieve trip.'
    });
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const validationErrors = validateTrip(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Please correct the trip information.',
        errors: validationErrors
      });
    }

    const existingTrip = await Model.findOne({
      code: req.body.code
    }).exec();

    if (existingTrip) {
      return res.status(409).json({
        message: 'A trip with this code already exists.'
      });
    }

    const newTrip = new Model({
      code: req.body.code.trim(),
      name: req.body.name.trim(),
      length: req.body.length.trim(),
      start: req.body.start,
      resort: req.body.resort.trim(),
      perPerson: Number(req.body.perPerson),
      image: req.body.image.trim(),
      description: req.body.description.trim()
    });

    const savedTrip = await newTrip.save();

    return res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Unable to add trip:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'The trip information is invalid.'
      });
    }

    return res.status(500).json({
      message: 'Unable to add trip.'
    });
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const validationErrors = validateTrip(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: 'Please correct the trip information.',
        errors: validationErrors
      });
    }

    if (req.body.code !== req.params.tripCode) {
      return res.status(400).json({
        message: 'The trip code cannot be changed.'
      });
    }

    const updatedTrip = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        name: req.body.name.trim(),
        length: req.body.length.trim(),
        start: req.body.start,
        resort: req.body.resort.trim(),
        perPerson: Number(req.body.perPerson),
        image: req.body.image.trim(),
        description: req.body.description.trim()
      },
      {
        new: true,
        runValidators: true
      }
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({
        message: 'Trip not found.'
      });
    }

    return res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Unable to update trip:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'The trip information is invalid.'
      });
    }

    return res.status(500).json({
      message: 'Unable to update trip.'
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};