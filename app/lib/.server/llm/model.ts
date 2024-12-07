import { createAnthropic } from '@ai-sdk/anthropic';
import { Configuration, OpenAIApi } from 'openai';

// Define the unified interface for AI models
interface AIModel {
  name: string;
  provider: string;
  callModel(prompt: string, options?: Record<string, any>): Promise<string>;
}

// Implement the Anthropic model integration
function getAnthropicModel(apiKey: string): AIModel {
  const anthropic = createAnthropic({ apiKey });
  return {
    name: 'Claude-3.5',
    provider: 'Anthropic',
    async callModel(prompt: string, options = {}) {
      const response = await anthropic('claude-3-5-sonnet-20240620')({
        prompt,
        maxTokensToSample: options.maxTokens || 1000,
      });
      return response.completion;
    },
  };
}

// Implement the OpenAI model integration
function getOpenAIModel(apiKey: string, model: string = 'gpt-4'): AIModel {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  return {
    name: model,
    provider: 'OpenAI',
    async callModel(prompt: string, options = {}) {
      const response = await openai.createChatCompletion({
        model,
        messages: [
          { role: 'system', content: options.systemPrompt || '' },
          { role: 'user', content: prompt }
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
      });
      return response.data.choices[0]?.message?.content || '';
    },
  };
}

// Create a model registry for dynamic model selection
type ModelProvider = 'OpenAI' | 'Anthropic';

export function getModel(
  provider: ModelProvider,
  apiKey: string,
  options: Record<string, any> = {}
): AIModel {
  switch (provider) {
    case 'OpenAI':
      return getOpenAIModel(apiKey, options.model || 'gpt-4');
    case 'Anthropic':
      return getAnthropicModel(apiKey);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
