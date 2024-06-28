const express = require('express');
const { register, verifyOTP, addInformation, login, getUserInformation, updateInformation } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Auth Route');
});
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/addinformation', addInformation);
router.post('/login', login);
router.get('/userinformation', authMiddleware, getUserInformation);
router.put('/updateinformation', authMiddleware, updateInformation);

module.exports = router;
