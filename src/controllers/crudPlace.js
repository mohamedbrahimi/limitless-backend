import Place from '../models/place';

async function savePlace(req, res) {

    const { name, title, description, coordinates } = req.body;

    if (!coordinates.lat || !coordinates.lng ) {
      return res.status(400).json({
        success: false,
        error: 'Place coordinates is not valid',
        errorKey: 'PLACE_COORDINATES_NOT_VALID',
      });
    }
    try {
      const place = new Place.create({
        name,
        title,
        description,
        coordinates,
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
