"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { quizQuestions } from '@/lib/data';

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizQuestions[currentIndex];

  const correctCount = useMemo(
    () => Object.values(answers).filter((value) => value.length > 0).length,
    [answers],
  );

  const selectOption = (option: string) => {
    if (question.type === 'single') {
      setSelected([option]);
      return;
    }

    setSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const handleSubmit = () => {
    const response = [...selected];
    const isCorrect =
      question.type === 'single'
        ? response[0] === question.correct
        : response.length === question.correct.length &&
          response.every((option) => question.correct.includes(option));

    setAnswers((prev) => ({ ...prev, [currentIndex]: response }));
    setFeedback(
      isCorrect
        ? 'Goed gedaan! Dit antwoord is juist.'
        : `Niet helemaal goed. Het juiste antwoord is: ${question.correct.join(', ')}`,
    );

    if (currentIndex === quizQuestions.length - 1) {
      setIsFinished(true);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelected(answers[nextIndex] ?? []);
      setFeedback(null);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelected(answers[prevIndex] ?? []);
      setFeedback(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Quiz</p>
            <h1 className="mt-2 text-3xl font-black">Klassieke quizmodus</h1>
          </div>
          <div className="rounded-full border border-primary-400/40 bg-primary-500/10 px-3 py-2 text-sm font-medium text-primary-100">
            Stopwatch actief
          </div>
        </div>

        <div className="card">
          <div className="mb-6 flex items-center justify-between text-sm text-slate-300">
            <span>
              Vraag {currentIndex + 1} van {quizQuestions.length}
            </span>
            <span>{correctCount} goed</span>
          </div>

          <h2 className="text-2xl font-bold text-white">{question.prompt}</h2>

          <div className="mt-6 space-y-3">
            {question.options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectOption(option)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? 'border-primary-400 bg-primary-500/10'
                      : 'border-slate-700 bg-slate-950/60 hover:border-primary-400 hover:bg-slate-900'
                  }`}
                >
                  <span>{option}</span>
                  <span className={`h-4 w-4 rounded-full border ${isSelected ? 'border-primary-300 bg-primary-400' : 'border-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className="mt-6 rounded-xl border border-primary-400/30 bg-primary-500/10 p-4 text-sm text-primary-100">
              {feedback}
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <button type="button" className="btn-secondary" onClick={previousQuestion} disabled={currentIndex === 0}>
              Vorige
            </button>

            {!isFinished ? (
              <button type="button" className="btn-primary" onClick={handleSubmit}>
                Beantwoorden
              </button>
            ) : (
              <Link href="/results" className="btn-primary">
                Resultaten bekijken
              </Link>
            )}

            {!isFinished && currentIndex < quizQuestions.length - 1 && (
              <button type="button" className="btn-primary" onClick={nextQuestion}>
                Volgende
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
