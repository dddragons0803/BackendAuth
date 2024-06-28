const express = require('express');
const { register, verifyOTP, addInformation, login, getUserInformation, updateInformation } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Auth Route');
});
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered. Please check your email for the OTP.
 *       400:
 *         description: Bad request
 */
router.post('/register', register);
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified. You can now add additional information.
 *       400:
 *         description: Invalid OTP
 */
router.post('/verify-otp', verifyOTP);
/**
 * @swagger
 * /api/auth/addinformation:
 *   post:
 *     summary: Add additional user information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *               age:
 *                 type: number
 *               work:
 *                 type: string
 *               dob:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated
 *       400:
 *         description: Bad request
 */
router.post('/addinformation', addInformation);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in and JWT token generated
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);
/**
 * @swagger
 * /api/auth/userinformation:
 *   get:
 *     summary: Get user information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/userinformation', authMiddleware, getUserInformation);
/**
 * @swagger
 * /api/auth/updateinformation:
 *   put:
 *     summary: Update user information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               age:
 *                 type: number
 *               work:
 *                 type: string
 *               dob:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated
 *       401:
 *         description: Unauthorized
 */
router.put('/updateinformation', authMiddleware, updateInformation);

module.exports = router;
