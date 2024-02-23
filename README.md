# TRIVIFY! *A Quiz app powered by OpenAI*

## Welcome to Trivify!

Trivify is a console application designed to turn your input into an engaging quiz. 

## How it works

The journey begins by prompting you to share your name. Once introduced, the app invites you to provide specific content. This content serves as the foundation for generating thought-provoking questions using the powerful GPT-3.5 model.

As the GPT-3.5 model processes your input, it crafts a series of interactive, multiple-choice questions. When the quiz begins, you'll find yourself immersed in an engaging experience. Each question allows you to choose your answer from a list, complete with the flexibility to navigate up and down.

Upon answering all the questions, Trivify compiles your results, distinguishing between correct and incorrect answers. The personalized feedback is then presented, giving you a comprehensive overview of your performance. Trivify transforms information into an interactive learning experience, providing both entertainment and knowledge assessment in a single console app.

## Technologies Used

This console application is built using the following technologies:

1. **Node.js**: The runtime environment for executing JavaScript code outside of a web browser.

2. **JavaScript**: The programming language used to develop the application logic.

3. **OpenAI GPT-3.5**: Leveraged for natural language processing to generate interactive quiz questions based on user input.

4. **Inquirer**: A command-line user interface library for Node.js, used for interactive prompts.

5. **Chalk**: A library for styling console output, enhancing the presentation of messages and prompts.

## Installation Notes

1. **Node.js:**
      * Visit Node.js official website.
      * Download and install the latest LTS version for your operating system.
      * Follow the installation instructions provided on the website.


2. **OpenAI GPT-3.5**:
    * Sign up for an account on the OpenAI platform.
    * Obtain your API key from the OpenAI platform.
    * Create a file named .env in the root of your project and add the following line, replacing YOUR_API_KEY with your actual API key:

        ```OPENAI_API_KEY=YOUR_API_KEY```


3. **Inquirer**:
    * In your project directory, run the following command to install Inquirer:

        ```npm install inquirer```


4. **Chalk**:
    * Run the following command to install Inquirer:

        ```npm install chalk```


5. **nanospinner**:
    * Run the following command to install nanospinner:

        ```npm install nanospinner```


6. **readline-sync**:
    * Run the following command to install readline-sync:

        ```npm install readline-sync```

 
## Running the Application

After installing all dependencies, you can run your Node.js application in your terminal using the following command:

```node index.js``` 

or

```npm start``` in the folder

## Limitations

Trivify utilizes the powerful OpenAI GPT-3.5 model for question generation; however, the accuracy depends on input quality.

Occasionally, the application may face bugs or crashes due to the complexity of natural language processing. Additionally, the Inquirer.js library for interactive prompts may experience intermittent failures. 

### Note:

Trivify is not intended for commercial use or deployment in production environments. It serves as a personal project developed by me, as a final year tech student, designed to showcase my programming skills and proficiency with natural language processing using OpenAI GPT-3.5

While the application provides an engaging quiz experience, it is a learning-oriented project rather than a fully polished, production-ready application.

Your understanding and feedback on the project's functionality and code are highly appreciated as part of the ongoing learning process.
