export type QuestionType = 'single' | 'multiple';

export type QuizQuestion = {
  id: number;
  prompt: string;
  type: QuestionType;
  options: string[];
  correct: string[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'Welke van deze getallen is een priemgetal?',
    type: 'single',
    options: ['9', '13', '21', '27'],
    correct: ['13'],
  },
  {
    id: 2,
    prompt: 'Welke kleuren worden gecombineerd om groen te krijgen?',
    type: 'single',
    options: ['Blauw en geel', 'Rood en blauw', 'Geel en rood', 'Paars en groen'],
    correct: ['Blauw en geel'],
  },
  {
    id: 3,
    prompt: 'Welke woorden zijn juiste meervoudsvormen?',
    type: 'multiple',
    options: ['Bomen', 'Huisen', 'Kinderen', 'Autoos'],
    correct: ['Bomen', 'Kinderen'],
  },
  {
    id: 4,
    prompt: 'Wat is 15% van 200?',
    type: 'single',
    options: ['20', '30', '35', '40'],
    correct: ['30'],
  },
];
