const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const about = (req, res) => {
  res.render('about', { title: 'About Travlr Getaways' });
};

const contact = (req, res) => {
  res.render('contact', { title: 'Contact Travlr Getaways' });
};

module.exports = {
  index,
  about,
  contact
};
