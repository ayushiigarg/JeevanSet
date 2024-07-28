const { validateLocationWithNominatim } = require('../utils/locationValidation');

const validateUserAddress = async (req, res, next) => {
  const { city, state, country } = req.body.address;

  const isValid = await validateLocationWithNominatim(city, state, country);

  if (!isValid) {
    return res.status(400).json({ success: false, message: 'Invalid location details' });
  }

  next();
};

module.exports = validateUserAddress;
