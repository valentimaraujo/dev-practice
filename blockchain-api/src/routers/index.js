const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Blockchain Api Server',
    version: '1.0.0'
  });
});

module.exports = router;