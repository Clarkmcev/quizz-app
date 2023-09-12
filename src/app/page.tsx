'use client';

import Image from 'next/image';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
import { useState } from 'react';
// Types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer;
      
      if (correct) setScore(prev => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      setUserAnswers(prev => [...prev, answerObject] )

    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last

    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  };

  return (
    <main className="flex flex-col space-y-2 bg-custom1 h-screen text-custom4">
      <h1 className="text-center p-10 text-2xl">Quiz application</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="p-4 bg-custom1 hover:text-white duration-100 transition-all" onClick={startTrivia}>
          Start a new quiz
        </button>
      ) : null}
      {loading ? <p>Loading questions ...</p> : null}
      {!loading && !gameOver ? (
        <QuestionCard
          score={score}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS ? (
        <button className="p-2 bg-custom2 w-fit mx-auto rounded text-custom1 hover:bg-custom3 hover:text-white" onClick={nextQuestion}>
          Next question
        </button>
      ) : null}
    </main>
  );
}
