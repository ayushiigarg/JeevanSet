const axios = require('axios');

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

async function validateLocationWithNominatim(city, state, country) {
  try {
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        q: `${city}, ${state}, ${country}`,
        format: 'json',
        addressdetails: 1
      }
    });
    return response.data.length > 0;
  } catch (error) {
    console.error('Error validating location with Nominatim:', error);
    return false;
  }
}

module.exports = {
  validateLocationWithNominatim
};
