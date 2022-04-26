import React, { useEffect, useState } from 'react'
import Questions from './Question.json'
import Item from "./Item"
import { QuestionType } from './QuestionsType';
import { Button } from '@mui/material';

const QuestionsComponent: React.FC = () => {
  const [QuesArray, setQuesArray] = useState<QuestionType[]>()
  const [answer, setAnswer] = useState<unknown[]>([,,,,])
  const [index, setIndex] = useState<number>(0);
  const items: QuestionType[] = Questions;
    useEffect(() => {
      setQuesArray(items)
      const ans = items.map(item => item.ans)
      setAnswer(ans);
      console.log(answer);
    }, [])
  
  const pushAnswer = (ans:any) => {
    console.log(index, ans);
    const tempAns: Array<any> = [...answer];
    tempAns[index] = ans;
    setAnswer(tempAns);
  }
  const nextQues = () => {
    setIndex((index) => index==3?index:index + 1);
  }
  const prevQues = () => {
    setIndex((index) => index==0?index:index - 1);
  };

  return (
    <div>
      {QuesArray && (
        <Item
          currentIndex={index}
          item={QuesArray[index]}
          pushAnswer={pushAnswer}
          answer={answer}
        />
      )}
      <Button onClick={prevQues}>Previous</Button>
      <Button onClick={nextQues}>Next</Button>
    </div>
  );
}

export default QuestionsComponent