import { Request, Response } from 'express';
import { prisma } from '../config/db';

// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: req.params.id as string },

      data: { read: true },
    });

    res.json(notification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a notification (Internal function)
export const createNotification = async (userId: string, title: string, message: string, type: string = 'info') => {
  try {
    await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
