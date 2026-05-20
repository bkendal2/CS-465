const trips = require('../data/trips.json');

const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
};

const about = (req, res) => {
    res.render('about', { title: 'About Travlr Getaways' });
};

const contact = (req, res) => {
    res.render('contact', { title: 'Contact Travlr Getaways' });
};

const travel = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways',
        trips
    });
};

module.exports = {
    index,
    about,
    contact,
    travel
};