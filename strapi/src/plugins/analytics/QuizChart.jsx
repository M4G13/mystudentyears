import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

import {getFetchClient} from '@strapi/helper-plugin';

const QuizChart = ({type}) => {

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  const { get } = getFetchClient();
  const fetchData = async () => {
    get(`../../analytics/${type}`)
      .then(response => setData(response.data))
  }

  const fetchOptions = async () => {
    fetch('../../../api/survey-options')
      .then(response => response.json())
      .then(data => setOptions(data.data.map(val => val.attributes.option)))
      .catch(error => console.log(error));
}

  useEffect(() => {
    fetchData();
    fetchOptions();
  }, []);

  return (
    <div style={{height: "45vh", width: "100%"}}>
      <ResponsiveBar
        data={data}
        keys={options}
        indexBy="question"
        margin={{ top: 50, right: 170, bottom: 50, left: 60 }}
        padding={0.3}
        theme={{"text":{"fill":"#ffffff"},"tooltip":{"container":{"color":"#000000"}}}}
        axisBottom={{
            legend: 'Question',
            legendPosition: 'middle',
            legendOffset: 32,
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
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        />
    </div>
  );
}

export default BarChart;
