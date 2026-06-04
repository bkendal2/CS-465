const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const travel = async function (req, res, next) {
  await fetch(tripsEndpoint, options)
    .then(res => res.json())
    .then(json => {
      res.render('travel', { title: 'Travlr Getaways', trips: json });
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  travel
};