import BarChart from './BarChart.jsx';
import SchoolMap from './SchoolMap.jsx';
import React, {useEffect} from 'react';
import { json2csv } from 'json-2-csv';

export default function Analytics() {
  return (
    <div>
      <BarChart type="InitialSurvey" />
      <BarChart type="FinalSurvey" />
      <SchoolMap />
      <a style={{backgroundColor: '#ffffff', padding: 5, borderRadius: 10, margin: 30}} href="../../api/stats/userDetails" download="UserData.csv">Download Data</a>
    </div>
  );
}
