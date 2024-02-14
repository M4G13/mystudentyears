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
        outFields: 'latitude,longitude,schoolname,laname,lacode,schuid',
        returnGeometry: false
      }).toString()
    }).then((response) => response.json())
      .then((data) => {
        data.features.forEach(val => {
          strapi.db.query('api::school.school').update({
            where: { schuid: val.attributes.schuid },
            data: val.attributes
          }).then(entry => {
            if (entry === null) strapi.entityService.create('api::school.school', {data: val.attributes});
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
