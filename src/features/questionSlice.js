import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../api';

// Action to fetch questions
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const response = await _getQuestions();
    return response;
  }
);
// Action to save a question answer
export const saveQuestionAnswer = createAsyncThunk(
  'questions/saveQuestionAnswer',
  async ({ authedUser, qid, answer }) => {
    const response = await _saveQuestionAnswer({ authedUser, qid, answer });
    return response;
  }
);

// Action to save a new question (poll)
export const saveQuestion = createAsyncThunk(
  'questions/saveQuestion',
  async ({ optionOneText, optionTwoText, author }) => {
    const response = await _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    return response;
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: {},
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle saveQuestion (creating a new poll)
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions[action.payload.id] = action.payload; 
      })
      .addCase(saveQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default questionsSlice.reducer;



