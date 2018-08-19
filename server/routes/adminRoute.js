const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(307).redirect('/login');
};



router.get('', adminController.get);
router.post('/skills', adminController.skills);
router.post('/upload', adminController.upload);


module.exports = router;