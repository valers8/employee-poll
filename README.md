Employee Polls App

# Description
The Employee Polls App is a React application that allows employees to vote in polls and create new polls. 
The app features authentication, a leaderboard, and a set of routes for answering questions, creating new polls, and viewing poll results. 
It leverages Redux for state management, React Router for routing, and Framer Motion for animations. 
The project also includes styled components for better UI and theming.

# Features
User Authentication
Create and answer polls
Leaderboard displaying top users based on their activity
Responsive design using styled-components
State management using Redux Toolkit
Animated components using Framer Motion

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation and Setup

Clone the repository
git clone https://github.com/valers8/employee-poll.git

# Navigate into the project directory

cd employee-poll

# Install the dependencies

npm install

## Available Scripts

## npm start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode. You can run tests for your API functions, Redux actions, and reducers

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

# Employee Polls App

## Project Structure

```bash
employee-polls/
├── src/                              # Main source folder
│   ├── components/                   # Reusable React components
│   │   ├── Homepage.js               # Home page displaying questions
│   │   ├── Leaderboard.js            # Leaderboard page displaying user rankings
│   │   ├── Loginpage.js              # Login page for user authentication
│   │   ├── Newpoll.js                # New poll creation page
│   │   ├── Pollpage.js               # Poll page to display poll details and voting
│   │
│   ├── features/                     # Redux slices for state management
│   │   ├── authSlice.js              # Authentication slice (login/logout)
│   │   ├── questionSlice.js          # Slice to manage questions (fetching, saving, voting)
│   │   ├── userSlice.js              # Slice to manage users (fetching users)
│   │
│   ├── api.js                        # Mock API functions to handle questions and users
│   ├── api.test.js                   # Unit tests for API functions
│   ├── App.css                       # Global CSS styles
│   ├── App.js                        # Main app component handling routes and navigation
│   ├── index.js                      # Entry point for React app
│   ├── store.js                      # Redux store configuration
│
└── README.md                         # Project documentation
```


## Redux Store

The application uses Redux Toolkit for state management. It includes three slices of state:

authSlice.js: Handles authentication-related actions like login and logout.
userSlice.js: Manages user data, including fetching users from the API.
questionSlice.js: Manages the questions, including creating new polls, answering polls, and fetching questions from the API.

## Routes
The app uses React Router for navigating between different pages:

/: Home page showing questions (unanswered/answered).
/leaderboard: Leaderboard displaying user rankings.
/add: Create a new poll.
/questions/:id: View and vote on a specific poll.
*: Redirects all other routes to the login page.

## API

The app uses a mock API to simulate fetching and saving data:

_getQuestions: Fetches all questions.
_getUsers: Fetches all users.
_saveQuestion: Saves a new question.
_saveQuestionAnswer: Saves an answer to a question.

## Technologies Used

React: For building the user interface.
Redux Toolkit: For managing the global state.
React Router: For handling routing between pages.
Styled Components: For CSS-in-JS styling.
Framer Motion: For animations.
Jest: For unit testing.

## License
MIT License
