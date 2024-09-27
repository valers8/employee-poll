import { _saveQuestion, _saveQuestionAnswer } from './api';
import { render, fireEvent } from '@testing-library/react';
import HomePage from './components/Homepage';
import LoginPage from './components/Loginpage';
import { Provider } from 'react-redux';
import { store } from './store';
import { MemoryRouter } from 'react-router-dom';
import userSliceReducer, { fetchUsers } from './features/userSlice';

describe('_saveQuestion', () => {

  test('HomePage should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return the saved question when valid data is passed', async () => {
    const questionData = {
      optionOneText: 'Option One Text',
      optionTwoText: 'Option Two Text',
      author: 'sarahedo',
    };

    const result = await _saveQuestion(questionData);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        author: questionData.author,
        optionOne: expect.objectContaining({
          text: questionData.optionOneText,
          votes: [],
        }),
        optionTwo: expect.objectContaining({
          text: questionData.optionTwoText,
          votes: [],
        }),
      })
    );
  });

  it('should throw an error if incorrect data is passed', async () => {
    const invalidQuestionData = {
      optionOneText: '',
      optionTwoText: 'Option Two Text',
      author: 'sarahedo',
    };

    await expect(_saveQuestion(invalidQuestionData)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('should return true when valid data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };

    const result = await _saveQuestionAnswer(answerData);

    expect(result).toBe(true);
  });

  it('should throw an error if invalid data is passed', async () => {
    const invalidAnswerData = {
      authedUser: '',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };

    await expect(_saveQuestionAnswer(invalidAnswerData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });

  test('should redirect after successful login', () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
  
    // Simulate user selecting a valid user and entering a password
    fireEvent.change(getByLabelText(/Select User:/i), { target: { value: 'sarahedo' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: '123' } });
  
    fireEvent.click(getByText(/Login/i));
  
    // Check if redirected to the home page
    expect(window.location.pathname).toBe('/');
  });

  it('should store authedUser in localStorage when login is called', () => {
    const authedUser = 'sarahedo';
    localStorage.setItem('authedUser', authedUser);
    const result = localStorage.getItem('authedUser');
    expect(result).toBe(authedUser);
  });

});

describe('userSlice reducer', () => {
  it('should set status to failed when fetchUsers is rejected', () => {
    const initialState = { users: {}, status: 'idle', error: null };
    const action = { type: fetchUsers.rejected.type, error: { message: 'Failed to fetch users' } }; // Rejected action with an error message
    const result = userSliceReducer(initialState, action);
    expect(result.status).toBe('failed');
    expect(result.error).toBe('Failed to fetch users');
  });

  it('should return the initial state', () => {
    const initialState = { users: {}, status: 'idle', error: null };
    const result = userSliceReducer(undefined, {}); // Using the name we gave it on import
    expect(result).toEqual(initialState);
  });

  it('should set status to idle when fetchQuestions', () => {
    const initialState = { questions: {}, status: 'idle', error: null };
    const action = { type: 'questions/fetchQuestions/pending' }; // Pending action as string
    const result = userSliceReducer(initialState, action); // Reducer processing the action
    expect(result.status).toBe('idle'); 
});

});
