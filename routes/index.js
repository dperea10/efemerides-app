const express = require('express');
const router = express.Router();

const {
  getEsfemeridesResult,
  updateEsfemerides,
  deleteEsfemerides,
  createEsfemerides
} = require('../controllers/esfemerides');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/api/esfemerides/all', getEsfemeridesResult);
router.get('/api/esfemerides/create', createEsfemerides);
router.put('/api/esfemerides/update/:id', updateEsfemerides);
router.get('/api/esfemerides/delete', deleteEsfemerides);

module.exports = router;