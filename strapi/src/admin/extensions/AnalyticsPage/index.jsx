import BarChart from './BarChart.jsx';
import SchoolMap from './SchoolMap.jsx';
import React from 'react';

export default function Analytics() {
  return (
    <div>
      <BarChart url={"http://localhost:1337/api/stats/initialSurvey"} />
      <SchoolMap />
    </div>
  );
}
