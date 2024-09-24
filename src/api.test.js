import { _saveQuestion, _saveQuestionAnswer } from './api';

describe('_saveQuestion', () => {
  it('should return the saved question and populate all fields when correctly formatted data is passed', async () => {
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
    const questionData = {
      optionOneText: '',
      optionTwoText: 'Option Two Text',
      author: 'sarahedo',
    };

    await expect(_saveQuestion(questionData)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('should return true and update the question and user when valid data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };

    const result = await _saveQuestionAnswer(answerData);

    expect(result).toBe(true);
  });

  it('should throw an error if invalid data is passed', async () => {
    const answerData = {
      authedUser: '',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    };

    await expect(_saveQuestionAnswer(answerData)).rejects.toEqual(
      'Please provide authedUser, qid, and answer'
    );
  });
});
