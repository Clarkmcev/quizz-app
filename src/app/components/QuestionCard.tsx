import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNr, totalQuestions}) =>{
  return (
    <div>
        <p className="number">
            Questions: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question}}/>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer} onClick={callback}></button>
                    <span dangerouslySetInnerHTML={{ __html: answer}}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default QuestionCard