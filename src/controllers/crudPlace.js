import Place from '../models/place';

async function savePlace(req, res) {

  const { name, title, description, location } = req.body;

  if (!location || !location.lat || !location.lng) {
    return res.status(400).json({
      success: false,
      error: 'Place coordinates is not valid',
      errorKey: 'PLACE_COORDINATES_NOT_VALID',
    });
  }

  try {
    const locationObj = {
      lat: Number.parseFloat(location.lat),
      lng: Number.parseFloat(location.lng)
    }

    const place = await Place.create({
      ...(name) && { name },
      ...(title) && { title },
      ...(description) && { description },
      ...(image) && { image },
      location: locationObj
    })

    return res.status(200).json(place);

  } catch (e) {
    return res.status(400).json({
      success: false,
      error: 'Error Saving Place',
      errorKey: 'PLACE_CREATE_ERROR',
    });
  }

}

export {
  savePlace,
};
