const express = require('express');
const axios = require('axios');

let service = axios.create({
  baseURL: 'http://localhost:3333/'
})

const app =  express();

app.get('/wallet-balance', async (req, res) => {
  let balance = await service.post('/merchant/45675bff-cec1-408f-9b52-d854526f457d/balance', {password:'ghetto-v5821'});
  res.json(balance.data);
});

app.get('/listing-addresses', async (req, res) => {
  let addresses = await service.post('/merchant/45675bff-cec1-408f-9b52-d854526f457d/accounts', {password:'ghetto-v5821'});
  res.json(addresses.data);
});

app.get('/fetch-address-balance', async (req, res) => {
  let addressBalance = await service.post('/merchant/45675bff-cec1-408f-9b52-d854526f457d/accounts/1JGmmNxcK81LrmcP7E1eAZ4DRSAZ2XqDiz', {
    password:'ghetto-v5821'
  });
  res.json(addressBalance.data);
});

app.get('/wallet-create', async (req, res) => {
  let wallet = await service.post('/api/v2/create', {
    password: 'ghetto-v5821',
    label: 'wallet-create',
    email: 'valentim_arauo@yahoo.com.br'
  });
  res.json(wallet.data);
});

app.listen(3000, () => {
  console.log('======================== SERVER LISTING ========================')
})