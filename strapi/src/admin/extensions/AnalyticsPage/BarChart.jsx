import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const url = "http://localhost:1337/api";

const BarChart = () => {

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(url + '/stats/initialSurvey')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
    fetch(url + '/survey-options')
      .then(response => response.json())
      .then(data => setOptions(data.data.map(val => val.attributes.option)))
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{height: 600, width: "100%"}}>
      <ResponsiveBar
        data={data}
        keys={options}
        indexBy="question"
        margin={{ top: 50, right: 170, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        theme={{"text":{"fill":"#ffffff"}}}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Question',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Responses',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}/>
    </div>
  );
}

export default BarChart;
