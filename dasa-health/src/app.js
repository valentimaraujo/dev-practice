require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const cors = require('cors');
const express = require('express');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

// SWAGGER API DOC
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const xss = require('xss-clean');
const Youch = require('youch');

const swaggerOptions = require('./config/swagger');

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const routesApp = require('./routes');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.swaggerDoc();
    // this.exceptionHandler();
  }

  middlewares() {
    const limiter = new RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0, // disable delaying - full speed until the max limit is reached
    });

    this.express.use(express.json({ limit: '10kb' }));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(xss());
    this.express.use(helmet());
    this.express.use(limiter);

    if (this.express.get('env') === 'development') {
      this.express.use(morgan('tiny'));
    }
  }

  routes() {
    this.express.use('/api/v1', routesApp);
  }

  swaggerDoc() {
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  exceptionHandler() {
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

module.exports = new AppController().express;
