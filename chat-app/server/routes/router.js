const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('serevr up and running');
});

module.exports = router;
