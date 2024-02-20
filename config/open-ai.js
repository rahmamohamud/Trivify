import OpenAIApi, { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

//Export connection to OpenAI's API to file index.js
export default openai;