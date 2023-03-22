import { Router } from 'express';
import { proxyMiddleware } from '../middlewares/proxyMiddleware';
import forumController from '../controllers/ForumController';
import themeController from '../controllers/ThemeController';
import userController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const router = Router();

// routes for forum
router.get('/topics', authMiddleware, forumController.getSections);
router.get('/allstate', authMiddleware, forumController.getAllState);
router.post(
  '/findquestions',
  authMiddleware,
  forumController.findQuestionsByTitle
);
router.post('/getsection', authMiddleware, forumController.getSection);
router.post('/questions', authMiddleware, forumController.addQuestion);
router.post('/messages', authMiddleware, forumController.addMessage);
router.post('/reactions', authMiddleware, forumController.addReaction);
// routes for theme
router.get('/theme', themeController.getUserTheme);
router.post('/theme', themeController.setUserTheme);
// routes for user
router.post('/user', authMiddleware, userController.createUser);
//
router.use('/', proxyMiddleware);
