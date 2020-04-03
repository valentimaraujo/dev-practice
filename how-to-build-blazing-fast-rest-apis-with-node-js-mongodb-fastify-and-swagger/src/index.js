const fastify = require('fastify')({
  logger: true
});
const mongoose = require('mongoose');

const routes = require('./routes');

// Import Swagger Options
const swagger = require('./config/swagger');
// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

mongoose.connect(`mongodb://localhost/mycargarage`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

fastify.get('/', async (req, res) => {
  return { message: 'Hello!!!' };
});

routes.forEach((route) => {
  fastify.route(route)
})

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.swagger();
    fastify.log.info(`Serve listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();