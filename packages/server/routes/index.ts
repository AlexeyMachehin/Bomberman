import forumController from '../controllers/ForumController';
import themeController from '../controllers/ThemeController';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Router = require('express').Router;

export const router = new Router();

// routes for forum
router.get('/topics', forumController.getSections);
router.get('/allstate', forumController.getAllState);
router.post('/findquestions', forumController.findQuestionsByTitle);
router.post('/getsection', forumController.getSection);
router.post('/questions', forumController.addQuestion);
router.post('/messages', forumController.addMessage);
router.post('/reactions', forumController.addReaction);
// routes for theme
router.get('/theme', themeController.findTheme);
router.post('/theme', themeController.createTheme);
