import BarChart from './BarChart.jsx';
import SchoolMap from './SchoolMap.jsx';
import StudentFunnel from './StudentFunnel.jsx';
import React from 'react';

export default function Analytics() {
  return (
    <div>
      <BarChart type="InitialSurvey" />
      <BarChart type="FinalSurvey" />
      <SchoolMap />
      <StudentFunnel />
    </div>
  );
}
