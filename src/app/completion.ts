import {
  NOTION_API_KEY,
  NOTION_API_URL,
  NOTION_DATABASE_ID,
  OPENAI_API_KEY,
  OPENAI_API_URL,
} from './env';

export type CompletionResponse = {
  completion: Completion;
  finish_reason: 'stop';
};

export type Completion = {
  word: string;
  meaning: string;
  example_1: string;
  example_2: string;
  synonym: string;
  parts_of_speech: string;
};

const MODEL = 'gpt-3.5-turbo';
const ROLE = 'user';
const TEMPERATURE = 0.5;
const MAX_TOKENS = 200;

const getPrompt = (word: string) => {
  return {
    role: ROLE,
    content: `Share the word [${word}] in the following json format {"word": , "meaning":, "example_1":, "example_2":, "synonym":, "parts_of_speech":}. Note The [word] should be converted to the present tense if it is a verb, and to the first person.`,
  };
};

const setProperty = (property: string, type: string) => {
  switch (type) {
    case 'rich_text':
      return {
        rich_text: [
          {
            text: {
              content: property,
            },
          },
        ],
      };
    case 'select':
      return {
        select: {
          name: property,
        },
      };
    case 'status':
      return {
        status: {
          status: {
            name: property,
          },
        },
      };
    case 'title':
      return {
        title: [
          {
            text: {
              content: property,
            },
          },
        ],
      };
  }
};

export const getCompletion = async (searchText: string): Promise<CompletionResponse> => {
  const res = await fetch(OPENAI_API_URL + '/completions', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [getPrompt(searchText)],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
    }),
  });
  const json = await res.json();
  const { message, finish_reason } = json.choices[0];
  const { content } = message;
  return {
    completion: JSON.parse(content),
    finish_reason,
  };
};

export const convertTextToNotionBody = (completion: CompletionResponse['completion']) => {
  const { word, meaning, example_1, example_2, synonym, parts_of_speech } = completion;

  // example_1, example_2はwordのとこをハイライトするようにしたい
  const body = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      parts_of_speech: setProperty(parts_of_speech, 'select'),
      example_1: setProperty(example_1, 'rich_text'),
      example_2: {
        rich_text: [
          {
            text: {
              content: example_2,
            },
            annotations: {
              code: true,
            },
          },
        ],
      },
      synonym: setProperty(synonym, 'rich_text'),
      meaning: setProperty(meaning, 'rich_text'),
      tone: setProperty('default', 'select'),
      status: setProperty('New', 'status'),
      word: setProperty(word, 'title'),
    },
  };

  return JSON.stringify(body);
};

export const addVocabToNotion = async (body: string) => {
  console.log(body);
  const res = await fetch(NOTION_API_URL + '/pages', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: 'Bearer ' + NOTION_API_KEY,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body,
  });
  const data = await res.json();
  return data;
};
