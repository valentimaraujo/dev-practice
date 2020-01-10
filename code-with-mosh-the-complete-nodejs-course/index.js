const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/courses', courses);

// Configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('startup Debugger...');
}

app.get('/', (req, res) => {
    res.render('index', {title: 'CodeWithMosh - The Complete Node.js Course', message: 'Version: 1.0.0'});
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
