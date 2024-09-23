// routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  changePassword,
  deleteAccount,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');



const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/change-password', protect, changePassword);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;
