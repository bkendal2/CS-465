module.exports = {
  index: (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
  },

  about: (req, res) => {
    res.render('about', { title: 'About Travlr Getaways' });
  },

  contact: (req, res) => {
    res.render('contact', { title: 'Contact Travlr Getaways' });
  }
};