const express = require ('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const{donate, getDonations, getAllDonations} = require('../controllers/donationsControllers');

router.post('/', protect, donate);
router.get('/', getDonations);
router.get('/alldonations', getAllDonations);

module.exports = router;