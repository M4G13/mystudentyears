import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ThemeContext } from 'styled-components';

import { Box, Typography } from '@strapi/design-system';
import {getFetchClient} from '@strapi/helper-plugin';

const QuizChart = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [question, setQuestion] = useState(0);

  const formatQuestion = (q) =>
    q ?
    Object.entries(q).slice(2).map(([k, v]) => ({ "question": k, "correct": 100*v/(q.totalResponses) })) : [];

  const { get } = getFetchClient();
  const theme = useContext(ThemeContext)
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
        tooltip={(bar, color,label)=>
        <Box
          background="white"
          textAlign="center"
          hasRadius
          padding={2}
          role="tooltip"
        >

          <h1 style={{color:"#777777"}}>
            {bar.indexValue}
          </h1>
          <p style={{color:"#777777"}}>
            (Click for questions)
          </p>
        </Box>
          }
        onClick={({index})=>{setQuestion(index)}}
        theme={{"text":{"fill":theme.colors.neutral800}}}
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
        theme={{"text":{"fill":theme.colors.neutral800},"tooltip":{"container":{"color":"#777777"}}}}
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
