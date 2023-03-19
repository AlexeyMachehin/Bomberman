import { forumService } from '@/service/ForumService';
import { IQuestion } from '@/service/types/forumPage/IQuestion';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const findQuestions = createAsyncThunk(
  'findquestions',
  async (text: string) => {
    const response = await forumService.findQuestions(text);
    return response;
  }
);

export const loadSection = createAsyncThunk(
  'loadsection',
  async (section: string) => {
    const response = await forumService.loadSection(section);
    return response;
  }
);

export const sendQuestion = createAsyncThunk(
  'sendquestion',
  async (question: IQuestion) => {
    const response = await forumService.sendQuestion(question);
    return response;
  }
);

export const getTopics = createAsyncThunk('gettopics', async () => {
  const response = await forumService.getTopics();
  return response;
});

export const addMessageReaction = createAsyncThunk(
  'addmessagereaction',
  async (payload: any) => {
    const response = await forumService.addMessageReaction(payload);
    return response;
  }
);

export const sendMessage = createAsyncThunk(
  'sendmessage',
  async (payload: any) => {
    const response = await forumService.sendMessage(payload);
    return response;
  }
);
