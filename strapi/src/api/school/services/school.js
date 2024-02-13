'use strict';

/**
 * school service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::school.school', ({ strapi }) => ({
  async fetchSchools() {
    fetch('https://maps.gov.scot/server/rest/services/ScotGov/UtilityGovernmental/MapServer/0/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        where: 'schooltype = \'Secondary\'',
        f: 'json',
        outFields: 'latitude,longitude,schoolname',
        returnGeometry: false
      }).toString()
    }).then((response) => response.json())
      .then((data) => {
        data.features.forEach(val => {
          const info = {
            Name: val.attributes.schoolname,
            latitude: val.attributes.latitude,
            longitude: val.attributes.longitude
          };
          strapi.db.query('api::school.school').update({
            where: { Name: val.attributes.schoolname },
            data: info
          }).then(entry => {
            if (entry === null) strapi.entityService.create('api::school.school', {data: info});
          }
          );
        });
        console.log('Successfully updated schools data');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}));
