import React, { useState, useEffect } from 'react';
import scotland from './scotland.json';
import { ResponsiveGeoMap } from '@nivo/geo';
import * as topojson from "topojson-client";

const url = "http://localhost:1337/api";

export default function SchoolMap() {
  const [schools, setSchools] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(url + '/schools?pagination[pageSize]=500')
      .then(response => response.json())
      .then(data => setSchools(data.data))
      .catch(error => console.log(error));
    fetch(url + '/app-users?pagination[pageSize]=500&populate=*')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.log(error));
  }, []);

  const geojson = topojson.feature(scotland, scotland.objects.lad);

  return (
    <div style={{height: 300}}>
      <ResponsiveGeoMap
          features={geojson.features}
        />
    </div>
  );
}
