const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
require('./app_api/models/db');

const apiRouter = require('./app_api/routes/index');

const app = express();
const port = 3000;

// ===== Handlebars setup =====
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'app_server/views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server/views'));

// ===== Static files =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== Routes =====
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);

// ===== Start server =====
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});