const axios = require('axios');

const geocodeAddress = async (req, res, next) => {
  const  address  = req.body?.address;
  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (!address) return res.status(400).json({ message: "Address required" });

  try {
    const add = encodeURIComponent(address)
    const url = `https://api.geoapify.com/v1/geocode/search?text=${add}&apiKey=${apiKey}`;

    console.log(url)
    
    const response = await axios.get(url);

    if (response.data.features?.length > 0) {
      const [lon, lat] = response.data.features[0].geometry.coordinates;
      // Attach to req.body for the controller to use
      req.body.location = { type: 'Point', coordinates: [lon, lat] };
      next();
    } else {
      return res.status(400).json({ message: "Invalid Address" });
    }
  } catch (error) {
    res.status(500).json({ message: "Geocoding Error" });
  }
};

module.exports = geocodeAddress;
