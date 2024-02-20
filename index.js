import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import inquirer from 'inquirer';

import {createSpinner} from 'nanospinner';

console.log(chalk.cyan.bold.italic('Welcome to Trivify! Your one stop to creating quizzes in an instant!'))
console.log(chalk.magenta('Steps: First enter your name, then enter your content when asked "Your Input:", and after a few seconds, a series of interactive, multiple choice will be produced and your results will follow.'))
console.log(" ")

let playerName;

console.log(" ");
//Functioning QUIZ
async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default(){
            return 'Player';
        },
    })
    playerName = answers.player_name;
}

await askName();
console.log(" ");

//User input
const userInput = readlineSync.question(chalk.green('Your Input: '));


//Prompt for GPT model to provide information
const messages = [
    { role: 'system', content: 'You are a helpful assistant. Take this content and generate 3 multiple-choice questions. Format it like this: The question groups are seperated by a forward slash, and the question and choices are seperated by a semi-colon. Only offer 4 choices per question. Do not number the choices, simply provide the words. The correct option is always after all the choices. Leave everything in one sentence (for example: What is 2 plus 2?; 1; 3;4;6;4/What is 3 times 3?;9;2;3;4;9/What color is the sky?;blue;green;white;orange;blue)' },
    { role: 'user', content: userInput },
  ];
  

//Function for interactive quiz
async function main() {

console.log(chalk.bgBlack.bold("Quiz time!"));
console.log(" ");

  //Retrieve AI generated content
  const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 250,
        n: 1,
      });


      let AIcontent = '"' + chatCompletion.choices[0].message.content + '"';


      //Split the questions    
      let questions = AIcontent.split('/');

      //Test
      //console.log(AIcontent);
      
      // Map over the questions to extract details
      let parsedQuestions = questions.map(question => {

        // Split each question into its components
        let [questionText, ...choices] = question.split(';');
      
        // Extract correct choice
        let correctChoice = choices.pop();
      
        return {
          question: questionText,
          choices: choices,
          correctChoice: correctChoice
        };
      });
      
      //Access the parsed questions
      let question1 = parsedQuestions[0];
      let question2 = parsedQuestions[1];
      let question3 = parsedQuestions[2];
      


      //Test
      //console.log(parsedQuestions);
      
      
      // Access individual choices for each question
      let question1_text = question1.question;
      let question1_choice_1 = question1.choices[0];
      let question1_choice_2 = question1.choices[1];
      let question1_choice_3 = question1.choices[2];
      let question1_choice_4 = question1.choices[3];
      let question1_correct_choice = question1.correctChoice;
      
      let question2_text = question2.question;
      let question2_choice_1 = question2.choices[0];
      let question2_choice_2 = question2.choices[1];
      let question2_choice_3 = question2.choices[2];
      let question2_choice_4 = question2.choices[3];
      let question2_correct_choice = question2.correctChoice;
      
      let question3_text = question3.question;
      let question3_choice_1 = question3.choices[0];
      let question3_choice_2 = question3.choices[1];
      let question3_choice_3 = question3.choices[2];
      let question3_choice_4 = question3.choices[3];
      let question3_correct_choice = question3.correctChoice;

      
      
      // Test: Example usage
    //   console.log(question1_text);
    //   console.log(question1_choice_1);
    //   console.log(question1_choice_2);
    //   console.log(question1_choice_3);
    //   console.log(question1_choice_4);
    //   console.log("Correct Choice: " + question1_correct_choice);




const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

//Function to make quiz interactive
async function askQuestion(question, choices, correctAnswer) {
    const answers = await inquirer.prompt({
      name: 'userAnswer',
      type: 'rawlist',
      message: question,
      choices: choices,
    });
  
    return answers.userAnswer === correctAnswer;
  }
  

async function Quiz() {
    const questionone = await askQuestion(chalk.bold.green(question1_text), [
      question1_choice_1,
      question1_choice_2,
      question1_choice_3,
      question1_choice_4
    ], question1_correct_choice);
  
    const questiontwo = await askQuestion(chalk.bold.green(question2_text), [
      question2_choice_1,
      question2_choice_2,
      question2_choice_3,
      question2_choice_4
    ], question2_correct_choice);

    const questionthree = await askQuestion(chalk.bold.green(question3_text), [
        question3_choice_1,
        question3_choice_2,
        question3_choice_3,
        question3_choice_4
      ], question3_correct_choice);

    
    // Handling the results
    console.log(" ");
    console.log(chalk.bold.magenta('Results (In chronilogical order): '));

    handleAnswer(questionone, playerName);
    
    handleAnswer(questiontwo, playerName);
   
    handleAnswer(questionthree, playerName);

  }

//Function to handle results
async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...');
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice Work ${playerName}. Your answer is correct`})
    }else{
        spinner.error({text: `Your answer is incorrect, ${playerName}`})
        
    }
}

//Call quiz function
Quiz();

}

//Call main function
main();