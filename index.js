// Importing required libraries
import openai from './config/open-ai.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

// Displaying welcome message and instructions
console.log(chalk.cyan.bold.italic('Welcome to Trivify! Your one-stop to creating quizzes in an instant!'));
console.log(chalk.magenta('Steps: First enter your name, then enter your content when asked "Your Input:", and after a few seconds, a series of interactive, multiple-choice questions will be produced, and your results will follow.'));

// Variable to store player name
let playerName;

// Function to ask for the player's name
async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });
  playerName = answers.player_name;
}

// Asking for player's name
await askName();

// Asking for user input (content for generating questions)
const userInput = await inquirer.prompt({
  name: 'userInput',
  type: 'input',
  message: chalk.green('Your Input:'),
});

// Messages array containing system instructions and user input
const messages = [
  { role: 'system', content: 'You are a helpful assistant. Take this content and strictly generate 5 multiple-choice questions. Format it like this: The question groups are separated by a forward slash, and the question and choices are separated by a semi-colon. Only offer 4 choices per question. Do not number the choices, simply provide the words. The correct option is always after all the choices. Leave everything in one sentence (for example: What is 2 plus 2?; 1; 3;4;6;4/What is 3 times 3?;9;2;3;4;9/What color is the sky?;blue;green;white;orange;blue). Do not make the correct choice a random choice. Make sure it is accurate according to the content'},
  { role: 'user', content: userInput.userInput },
];

// Main function to interact with OpenAI API and manage quiz generation
async function main() {
  // Requesting completion from OpenAI API
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 500,
    n: 1,
  });

  // Extracting content from the API response
  let AIcontent =  chatCompletion.choices[0].message.content;

  // Splitting the content into individual questions
  let questions = AIcontent.split('/');

  // Parsing each question into an object with question, choices, and correct choice
  let parsedQuestions = questions.map(question => {
    let [questionText, ...choices] = question.split(';');
    let correctChoice = choices.pop();
    return {
      question: questionText,
      choices: choices,
      correctChoice: correctChoice
    };
  });

  // Array to store quiz results
  let quizResults = [];

  // Iterating through each question, asking the user, and recording the result
  for (let i = 0; i < parsedQuestions.length; i++) {
    const question = parsedQuestions[i];
    const userAnswer = await askQuestion(question);
    const isCorrect = userAnswer === question.correctChoice;
    quizResults.push({ question, isCorrect });
  }

    // Displaying quiz results
    displayResults(quizResults);
}

// Function to ask a question using Inquirer
async function askQuestion(question) {
  const answers = await inquirer.prompt({
    name: 'userAnswer',
    type: 'rawlist',
    message: chalk.bold.green(question.question),
    choices: question.choices,
  });

  return answers.userAnswer;
}

// Function to display quiz results
function displayResults(quizResults) {
  console.log(" ");
  console.log(chalk.bold.magenta('Results: '));

  // Iterating through each result and displaying feedback
  quizResults.forEach((result, index) => {
    const { question, isCorrect } = result;
    handleAnswer(index + 1, question, isCorrect);
  });
}

// Function to handle displaying feedback for each question
function handleAnswer(questionNumber, question, isCorrect) {
  const spinner = createSpinner(`Checking answer for Question ${questionNumber}...`);
  if (isCorrect) {
    spinner.success({ text: `Nice Work ${playerName}. Your answer for "${question.question}" is correct` });
  } else {
    spinner.error({ text: `Your answer for Question ${questionNumber} is incorrect, ${playerName}. Correct answer: ${question.correctChoice}` });
  }
}

// Calling the main function to start the quiz
main();
