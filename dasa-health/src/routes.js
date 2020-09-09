const Router = require('express');

const middlewareAuth = require('./api/middlewares/auth');
const auth = require('./routes/auth');
const laboratory = require('./routes/laboratory');
const exam = require('./routes/exam');

const routes = Router();
routes.use('/user', auth);
routes.use('/laboratory', middlewareAuth, laboratory);
routes.use('/exam', middlewareAuth, exam);

module.exports = routes;
