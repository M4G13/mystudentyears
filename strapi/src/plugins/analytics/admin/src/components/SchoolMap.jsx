import React, { useState, useEffect } from 'react';
import scotland from './scotland.json';
import { ResponsiveChoropleth } from '@nivo/geo';
import * as topojson from "topojson-client";

import { getFetchClient } from '@strapi/helper-plugin';

export default function SchoolMap() {
  const [regions, setRegions] = useState([]);
  const [domain, setDomain] = useState([0, 0]);

  const { get } = getFetchClient();
  const fetchSchools = async () => {
    get('/analytics/laFreq')
      .then(data => {
        setRegions(data.data);
        const vals = data.data.map(r => r.value);
        setDomain([Math.min(...vals), Math.max(...vals)]);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchSchools();
  }, []);

  const geojson = topojson.feature(scotland, scotland.objects.lad);

  return (
    <div style={{height: 800}}>
      {regions && <ResponsiveChoropleth
          data={regions}
          theme={{"text":{"fill":"#ffffff"},"tooltip":{"container":{"color":"#000000"}}}}
          features={geojson.features}
          domain={domain}
          colors="YlGn"
          unknownColor="#555555"
          label='properties.LAD13NM'
          projectionScale={3700}
          projectionTranslation={[0.7, 6.25]}
          onClick={node => console.log(node, domain, regions)}
        />}
    </div>
  );
}
