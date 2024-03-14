import BarChart from './BarChart.jsx';
import SchoolMap from './SchoolMap.jsx';
import QuizChart from './QuizChart.jsx';
import React, {useState} from 'react';
import axios from 'axios';

import { Box, Tabs, Tab, TabGroup, TabPanels, TabPanel, Layout, BaseHeaderLayout, Button, Link, SubNav, SubNavHeader, SubNavSections, SubNavSection, Typography} from '@strapi/design-system';

import {Folder, ArrowLeft} from '@strapi/icons';
import {getFetchClient} from '@strapi/helper-plugin';

export default function Analytics() {
  const [ userData, setUserData ] = useState();

  const fetchData = async () => {
    const { get } = getFetchClient();
    const data = await get('../../analytics/userDetails');
    const elem = document.createElement('a');
    elem.setAttribute('href', URL.createObjectURL(new Blob([data.data, {type: 'text/csv'}])));
    elem.setAttribute('download', 'userdata.csv');
    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

  }

  return (
     <Box background="neutral100">
      <Layout>
      <BaseHeaderLayout
        navigationAction={
        <Link startIcon={<ArrowLeft />} to="/">
            Back
        </Link>}
        primaryAction={
            <Button startIcon={<Folder />} onClick={()=>fetchData()}>
              Download user data
            </Button>
          }
        title="Analytics"
          as="h2" />

        <TabGroup label="Some stuff for the label" id="tabs">
          <Tabs>
            <Tab>Survey Data</Tab>
            <Tab>School Data (map)</Tab>
            <Tab>Quiz Data</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <Box color="neutral800" padding={4} background="neutral0" style={{flex: 1}}>
              <BarChart type="InitialSurvey" />
              <BarChart type="FinalSurvey" />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box color="neutral800" padding={4} background="secondary100" flex={1}>
                <Typography variant="alpha" text-align={"center"}>Number of users by council area</Typography>
                <SchoolMap />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box color="neutral800" padding={4} background="neutral0">
                <QuizChart />
              </Box>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Layout>
    </Box>
  );
}
