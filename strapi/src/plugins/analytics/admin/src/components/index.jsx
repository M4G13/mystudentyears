import BarChart from './BarChart.jsx';
import SchoolMap from './SchoolMap.jsx';
import React, {useEffect} from 'react';
import { json2csv } from 'json-2-csv';
import axios from 'axios';

import {getFetchClient} from '@strapi/helper-plugin';
export default function Analytics() {
  const fetchData = async () => {
    const { get } = getFetchClient();
    const response = await get('http://localhost:1337/analytics/initialSurvey');
    console.log(response.data);
  }

  useEffect(()=>{
    fetchData();
  }, []);
  return (
    <div>
      {/*<BarChart type="InitialSurvey" />
      <BarChart type="FinalSurvey" />
      <SchoolMap />
      <a style={{backgroundColor: '#ffffff', padding: 5, borderRadius: 10, margin: 30}} href="../../api/stats/userDetails" download="UserData.csv">Download Data</a>*/}
    </div>
  );
}
