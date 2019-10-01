import Place from '../models/place';
import User from '../models/user';
import Tag from '../models/tag';

async function createTag(req, res) {

  const { place, userId } = req.body;

  if (!place.coordinates.lat || !place.coordinates.lng) {
    return res.status(400).json({
      success: false,
      error: 'Place coordinates is not valid',
      errorKey: 'PLACE_COORDINATES_NOT_VALID',
    });
  }

  try {
    let place = Place.findOne({
      'location.coordinates': place.coordinates,
      ...(place.name) && { name: place.name },
    })

    if (!place) {
      place = await new Place.create({
        'location.coordinates': place.coordinates,
        ...(place.name) && { name: place.name },
        ...(place.title) && { title: place.title },
        ...(place.desciption) && { description: place.desciption },
      })
    }

    const user = User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        errorKey: 'USER_NOT_FOUND',
      });
    }

    const tag = await new Tag.create({
      place: place.id,
      user: userId,
    })

    return res.status(200).json(tag);

  } catch (e) {
    return res.status(400).json({
      success: false,
      error: 'Error Saving Place',
      errorKey: 'PLACE_CREATE_ERROR',
    });
  }

}

async function listTags(res, req) {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'User ID required',
      errorKey: 'USER_ID_REQUIRED',
    });
  }

  const user = await User.findOne({ _id: userId }).lean();
  const tagsSharedWithUser = user.sharedTags;
  let tagsList = await Tag.find({
    $or: [
      { user: userId },
      {
        $in: tagsSharedWithUser
      }
    ]
  }).populate('place').lean();
  return tagsList;
}

export {
  createTag,
  listTags,
};
