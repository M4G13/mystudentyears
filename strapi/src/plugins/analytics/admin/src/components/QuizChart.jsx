import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

import {getFetchClient} from '@strapi/helper-plugin';

const QuizChart = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [question, setQuestion] = useState(0);

  const formatQuestion = (q) =>
    q ?
    Object.entries(q).slice(2).map(([k, v]) => ({ "question": k, "correct": 100*v/(q.totalResponses) })) : [];

  const { get } = getFetchClient();
  const fetchData = async () => {
    get(`../../analytics/quizData`)
      .then(response => {setQuizzes(response.data)})
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    <div style={{height: "70vh", width: "100%"}}>
      <ResponsiveBar
        data={quizzes}
        keys={['totalResponses']}
        colorBy="index"
        indexBy="description"
        margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
        padding={0.3}
        tooltip={(bar,color,label)=>{return(
            <div style={{borderRadius: 4,backgroundColor:"#ffffff", color:"#000000", padding: 4, textAlign: "center"}}>
            <h1>{bar.indexValue}</h1>
            <p>(click for questions)</p>
            </div>
          )}}
        onClick={({index})=>{setQuestion(index)}}
        theme={{"text":{"fill":"#ffffff"},"tooltip":{"container":{"color":"#000000"}}}}
        axisBottom={{
            tickRotation: 25
        }}
        axisLeft={{
            legend: 'Responses',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        />
    </div>
    <div style={{height: "45vh", width: "100%"}}>
      <ResponsiveBar
        data={formatQuestion(quizzes[question])}
        keys={['correct']}
        indexBy="question"
        colorBy="index"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        minValue={0}
        maxValue={100}
        theme={{"text":{"fill":"#ffffff"},"tooltip":{"container":{"color":"#000000"}}}}
        axisBottom={{
            legend: 'Question',
            legendPosition: 'middle',
            legendOffset: 32,
        }}
        axisLeft={{
            legend: '% Correct',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        />
    </div>
    </div>
  );
}

export default QuizChart;
