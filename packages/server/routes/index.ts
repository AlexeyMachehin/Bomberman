import { Router } from 'express';
import { proxyMiddleware } from '../middlewares/proxyMiddleware';
import forumController from '../controllers/ForumController';
import themeController from '../controllers/ThemeController';
import userController from '../controllers/UserController';

export const router = Router();

// routes for forum
router.get('/topics', forumController.getSections);
router.get('/allstate', forumController.getAllState);
router.post('/findquestions', forumController.findQuestionsByTitle);
router.post('/getsection', forumController.getSection);
router.post('/questions', forumController.addQuestion);
router.post('/messages', forumController.addMessage);
router.post('/reactions', forumController.addReaction);
// routes for theme
router.get('/theme', themeController.getUserTheme);
router.post('/theme', themeController.setUserTheme);
// routes for user
router.post('/user', userController.createUser);
//
router.use('/', proxyMiddleware);
