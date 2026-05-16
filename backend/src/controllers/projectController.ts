import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { createNotification } from './notificationController';


// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Project name is required' });
      return;
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        userId: req.user.id,
      },
    });

    // Create Notification
    createNotification(req.user.id, 'New Project Created 🚀', `Project "${name}" has been successfully created.`, 'success');

    res.status(201).json(project);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id as string },
    });


    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Check if project belongs to user
    if (project.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403).json({ message: 'Not authorized to access this project' });
      return;
    }

    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
