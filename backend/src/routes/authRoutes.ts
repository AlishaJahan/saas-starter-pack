import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Test RBAC Routes
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User profile accessed', user: req.user });
});

router.get('/admin', protect, authorize('ADMIN'), (req, res) => {
  res.json({ message: 'Admin dashboard accessed', user: req.user });
});

export default router;
