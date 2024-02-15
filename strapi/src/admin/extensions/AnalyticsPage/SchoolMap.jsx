import React, { useState, useEffect } from 'react';
import scotland from './scotland.json';
import { ResponsiveChoropleth } from '@nivo/geo';
import * as topojson from "topojson-client";

const url = "http://localhost:1337/api";

export default function SchoolMap() {
  const [schools, setSchools] = useState([]);
  const [users, setUsers] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch(url + '/stats/laFreq')
      .then(response => response.json())
      .then(data => setRegions(data))
      .catch(error => console.log(error));
    fetch(url + '/app-users?pagination[pageSize]=500&populate=*')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.log(error));
  }, []);

  const geojson = topojson.feature(scotland, scotland.objects.lad);
  console.log(regions);

  return (
    <div style={{height: 1000}}>
      <ResponsiveChoropleth
          data={regions}
          features={geojson.features}
          domain={[5,31]}
          colors="RdPu"
          label='properties.LAD13NM'
          projectionScale={4000}
          projectionTranslation={[0.5, 5.4]}
          onClick={node => console.log(node)}
        />
    </div>
  );
}
