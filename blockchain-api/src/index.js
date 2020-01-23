const debug = require('debug')('app:startup');
const express = require('express');
const routers = require('./routers');
const morgan = require('morgan');
const helmet = require('helmet');
const Blockchain = require('./modules/Blockchain');

const blockchain = new Blockchain('valente');

console.log(blockchain.api_key);
console.log(blockchain.checkConfig());

const app = express();

app.use(helmet);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('startup Debugger...');
}

app.use(routers);

app.listen(3333, () => {
  console.log('====================== Blockchain Api Server run in port: 3333 ======================');
})