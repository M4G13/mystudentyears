import React, { useState, useEffect } from 'react';
import scotland from './scotland.json';
import { ResponsiveChoropleth } from '@nivo/geo';
import * as topojson from "topojson-client";

export default function SchoolMap() {
  const [regions, setRegions] = useState([]);
  const [domain, setDomain] = useState([0, 0]);

  useEffect(() => {
    fetch('../../api/stats/laFreq')
      .then(response => response.json())
      .then(data => {
        setRegions(data);
        const vals = data.map(r => r.value);
        setDomain([Math.min(...vals), Math.max(...vals)])
      })
      .catch(error => console.log(error));
  }, []);

  const geojson = topojson.feature(scotland, scotland.objects.lad);

  return (
    <div style={{height: 1000}}>
      {regions && <ResponsiveChoropleth
          data={regions}
          features={geojson.features}
          domain={domain}
          colors="RdPu"
          label='properties.LAD13NM'
          projectionScale={4000}
          projectionTranslation={[0.5, 5.4]}
          onClick={node => console.log(node, domain, regions)}
        />}
    </div>
  );
}
