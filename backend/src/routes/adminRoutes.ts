import express from 'express';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/adminController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Protect all routes in this router
router.use(protect);
router.use(authorize('ADMIN'));

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .delete(deleteUser);

router.route('/users/:id/role')
  .put(updateUserRole);

export default router;
