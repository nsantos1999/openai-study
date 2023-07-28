import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function runCompletion() {
  const fileContent = fs.readFileSync("./history.txt");

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `${fileContent.toString()}. Tell me the names of people that participate in this history`,
      },
    ],
    stream: false,
    temperature: 0.7,
  });
  console.log(completion.data.choices[0]);
}

runCompletion();
