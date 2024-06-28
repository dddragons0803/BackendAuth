const express = require('express');
const { registerAdmin, loginAdmin, viewAllUsers, viewUserDetails, deleteUser } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Admin Route');
});
/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin
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
 *         description: Admin registered
 *       400:
 *         description: Bad request
 */
router.post('/register', registerAdmin);
/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
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
 *         description: Admin logged in and JWT token generated
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginAdmin);
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: View all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of usernames
 *       401:
 *         description: Unauthorized
 */
router.get('/users', authMiddleware, viewAllUsers);
/**
 * @swagger
 * /api/admin/user/{username}:
 *   get:
 *     summary: View user details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:username', authMiddleware, viewUserDetails);
/**
 * @swagger
 * /api/admin/user/{username}:
 *   delete:
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/user/:username', authMiddleware, deleteUser);

module.exports = router;
