import forumController from '../controllers/ForumController';
import themeController from '../controllers/ThemeController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Router = require('express').Router;

export const router = new Router();

// routes for forum
router.get('/sections', forumController.getSections);
router.get('/allstate', forumController.getAllState);
router.post('/findquestions', forumController.findQuestionsByTitle);
router.post('/questions', forumController.addQuestion);
router.post('/messages', forumController.addMessage);
// routes for theme
router.get('/theme', themeController.findTheme);
router.post('/theme', themeController.createTheme);
