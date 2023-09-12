import React from 'react';
// Types
import { AnswerObject } from '../page';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
  score: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
  score,
}) => {
  return (
    <div className="mx-80 bg-custom1 rounded p-4">
      <div>
        <div className="justify-between flex text-custom4 py-4">
          <p>
            Questions: {questionNr} / {totalQuestions}
          </p>
          <p>Score: {score}</p>
        </div>
        <p
          className="cursor-default text-white py-4"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <div>
          {answers.map((answer, index) => (
            <div key={answer} className="flex items-center space-x-8">
                <div className="text-white">{index + 1}.</div>
              <button
                disabled={!!userAnswer}
                value={answer}
                onClick={callback}
                className="text-left text-custom4 duration-100 group transition-all py-2 bg-custom2 hover:bg-custom3 px-4 rounded my-2 cursor-pointer w-full"
              >
                <span
                  className="cursor-pointer group-hover:text-white brightness-150"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
