import { Request, Response } from 'express';
import { prisma } from '../config/db';
import bcrypt from 'bcryptjs';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (user) {
      const { name, email, password } = req.body;

      const data: any = {};
      if (name) data.name = name;
      if (email) data.email = email;
      
      if (password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
