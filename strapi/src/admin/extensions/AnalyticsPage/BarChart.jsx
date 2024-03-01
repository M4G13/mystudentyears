import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const url = "http://localhost:1337/api";

const BarChart = ({type}) => {

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(url + `/stats/${type}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
    fetch(url + '/survey-options')
      .then(response => response.json())
      .then(data => setOptions(data.data.map(val => val.attributes.option)))
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{height: "45vh", width: "100%"}}>
      <ResponsiveBar
        data={data}
        keys={options}
        indexBy="question"
        margin={{ top: 50, right: 170, bottom: 50, left: 60 }}
        padding={0.3}
        theme={{"text":{"fill":"#ffffff"}}}
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
