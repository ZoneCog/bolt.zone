// ...existing code...
import { getModel } from './lib/.server/llm/model';

// ...existing code...
const apiKey = 'your-api-key';
const provider: ModelProvider = 'OpenAI'; // or 'Anthropic'
const modelOptions = {
  model: 'gpt-4', // Specify the model if necessary
  // ...other options...
};

const model = getModel(provider, apiKey, modelOptions);

async function runExample() {
  const prompt = 'Explain the theory of relativity in simple terms.';
  const response = await model.callModel(prompt, {
    maxTokens: 500,
    temperature: 0.6,
    systemPrompt: 'You are a helpful assistant.',
  });
  console.log(`Response from ${model.name} (${model.provider}):`, response);
}

// ...existing code...
runExample();
