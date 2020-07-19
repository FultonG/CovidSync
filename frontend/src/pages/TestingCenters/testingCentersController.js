
import testingCenterData from './testingLocations.json';
import { get } from '../../utils/baseRequest';


function formatAddress({
  address_1,
  city,
  state_province,
  postal_code
}) {
  return `${postal_code} - ${address_1}, ${city}, ${state_province}`;
}

const centerData = testingCenterData.map((center) => {
  return {
    name: center.name,
    address: formatAddress(center.physical_address[0]),
    phone: center.phones[0].number,
    zip: center.physical_address[0].postal_code,
  };
});


async function getCoordsFromZips(zips) {
  const geoData = await Promise.all(zips.map( async (zip) => {
    const { data } = await get('/api/location/zipcode/' + zip);
    return {
      ...data[0].locations[0].latLng
    }
  }));
  return geoData;
}

export default {
  centerData,
  getCoordsFromZips,
};
