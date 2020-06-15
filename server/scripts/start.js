/* eslint-disable no-console */
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = require('../app');

require('dotenv').config({ path: '.env.development' });

console.log(chalk.bgCyanBright(`Showtime! Starting ${process.env.APP_NAME}`));

// // Connect to our Database and handle any bad connections

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.connection.on('error', (err) => {
  console.error(
    `🙅 🚫 🙅 ${chalk.bgRed.whiteBright(
      " IT'S MONGOOSE! ",
    )} 🙅 🚫 🙅 🚫 → ${chalk.bgRed.whiteBright(err.message)}`,
  );
});

// READY?! Let's go!
require('../models/Entry');


// Start our app!

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
