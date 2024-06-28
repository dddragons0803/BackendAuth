const express = require('express');
const { registerAdmin, loginAdmin, viewAllUsers, viewUserDetails, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', authMiddleware, viewAllUsers);
router.get('/user/:username', authMiddleware, viewUserDetails);
router.delete('/user/:username', authMiddleware, deleteUser);

module.exports = router;
