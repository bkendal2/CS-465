const mongoose = require('mongoose');
require('../models/travlr');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
  const q = await Model.find({}).exec();

  if (!q || q.length === 0) {
    return res.status(404).json({ message: 'No trips found' });
  } else {
    return res.status(200).json(q);
  }
};

const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }).exec();

  if (!q || q.length === 0) {
    return res.status(404).json({ message: 'Trip not found' });
  } else {
    return res.status(200).json(q);
  }
};

const tripsAddTrip = async (req, res) => {
  const newTrip = new Model({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  const q = await newTrip.save();

  if (!q) {
    return res.status(400).json({ message: 'Unable to add trip' });
  } else {
    return res.status(201).json(q);
  }
};

const tripsUpdateTrip = async (req, res) => {
  const q = await Model
    .findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    )
    .exec();

  if (!q) {
    return res.status(400).json({ message: 'Unable to update trip' });
  } else {
    return res.status(201).json(q);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};