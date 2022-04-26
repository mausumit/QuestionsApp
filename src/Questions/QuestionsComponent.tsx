import React, { useEffect, useState } from 'react'
import Questions from './Question.json'
import Item from "./Item"
import { QuestionType } from './QuestionsType';
import { Button } from '@mui/material';

const QuestionsComponent: React.FC = () => {
  const [QuesArray, setQuesArray] = useState<Array<QuestionType>>()
  const [index, setIndex] = useState<number>(0);
  const items: any= Questions;
    useEffect(() => {
      setQuesArray(items)
    }, [])
  const nextQues = () => {
    setIndex((index) => index==3?index:index + 1);
  }
  const prevQues = () => {
    setIndex((index) => index==0?index:index - 1);
  };

  return (
    <div>
          {QuesArray&&<Item currentIndex={index} item={QuesArray[index]} />}
      <Button onClick={prevQues}>Previous</Button>
      <Button onClick={nextQues}>Next</Button>
    </div>
  );
}

export default QuestionsComponent