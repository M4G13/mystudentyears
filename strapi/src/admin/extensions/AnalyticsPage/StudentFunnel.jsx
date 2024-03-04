import React, { useState, useEffect } from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';


const StudentFunnel = () => {
  const [data, setData] = useState([{id: 0, value: 0, label: "Temp"}]); // FIXME

  useEffect(() => {
    fetch(`../../api/stats/studentCompletion`)
      .then(response => response.json())
      .then(data => {console.log(data); setData(data);})
      .catch(error => console.log(error));
  }, []);

  return (
    <div style={{height: "30vh", width: "100%"}}>
      <ResponsiveFunnel
        margin={{ top: 50, right: 170, bottom: 50, left: 60 }}
        data={data}
        padding={0.3}
        />
    </div>
  );
}

export default StudentFunnel;
