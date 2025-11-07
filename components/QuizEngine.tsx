"use client";
import React from 'react';
import type { Question } from "@/lib/types";
import MathRenderer from './MathRenderer';
import clsx from 'classnames';

type Props = {
  questions: Question[];
};

export default function QuizEngine({ questions }: Props) {
  const [current, setCurrent] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const q = questions[current];

  function normalize(ans: string) {
    return ans.replace(/\s+/g, '').toLowerCase();
  }

  function checkAnswer() {
    if (!q) return;
    if (q.type === 'multiple-choice') {
      const isCorrect = selected === q.correctIndex;
      setFeedback(isCorrect ? 'Correct!' : 'Not quite. See the solution below.');
      setScore((s) => s + (isCorrect ? 1 : 0));
    } else if (q.type === 'input') {
      const cand = normalize(inputValue);
      const answers = [q.correctAnswer, ...(q.accept ?? [])].map(normalize);
      const isCorrect = answers.includes(cand);
      setFeedback(isCorrect ? 'Correct!' : 'Not quite. See the solution below.');
      setScore((s) => s + (isCorrect ? 1 : 0));
    }
  }

  function next() {
    const nextIdx = current + 1;
    if (nextIdx >= questions.length) {
      setCompleted(true);
    } else {
      setCurrent(nextIdx);
      setSelected(null);
      setInputValue('');
      setFeedback(null);
    }
  }

  if (!q) return null;

  return (
    <div className="rounded-xl border border-gray-100 p-5 mt-6">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <span>Question {current + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="prose max-w-none">
        <p className="font-medium">{q.prompt.includes('\\') ? <MathRenderer>{q.prompt}</MathRenderer> : q.prompt}</p>
      </div>

      {q.type === 'multiple-choice' && (
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={clsx(
                'text-left px-4 py-2 rounded-md border',
                selected === idx ? 'border-brand-600 bg-brand-50' : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              {opt.includes('\\') ? <MathRenderer>{opt}</MathRenderer> : opt}
            </button>
          ))}
        </div>
      )}

      {q.type === 'input' && (
        <div className="mt-4 flex items-center gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Your answer"
            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button onClick={checkAnswer} className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Check</button>
        <button onClick={next} className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50">{current + 1 >= questions.length ? 'Finish' : 'Next'}</button>
      </div>

      {feedback && (
        <div className="mt-4">
          <p className={clsx('text-sm', feedback.startsWith('Correct') ? 'text-green-700' : 'text-amber-700')}>{feedback}</p>
          {q.steps && q.steps.length > 0 && (
            <div className="mt-3 space-y-2 text-sm">
              <p className="font-medium">Step-by-step solution</p>
              <ol className="list-decimal ml-6 space-y-1">
                {q.steps.map((s, i) => (
                  <li key={i}>{s.includes('\\') ? <MathRenderer>{s}</MathRenderer> : s}</li>
                ))}
              </ol>
            </div>
          )}
          {q.explanation && (
            <div className="mt-2 text-sm text-gray-700">{q.explanation.includes('\\') ? <MathRenderer>{q.explanation}</MathRenderer> : q.explanation}</div>
          )}
        </div>
      )}

      {completed && (
        <div className="mt-6 p-4 bg-brand-50 border border-brand-100 rounded-md">
          <p className="font-medium">Great work! You scored {score} / {questions.length}.</p>
        </div>
      )}
    </div>
  );
}
