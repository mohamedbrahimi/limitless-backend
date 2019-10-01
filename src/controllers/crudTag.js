import Place from '../models/place';
import User from '../models/user';
import Tag from '../models/tag';

async function createTag(req, res) {

  const user = req.userdata;
  const { place } = req.body;

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

    const tag = await new Tag.create({
      place: place.id,
      user: user._id,
    })

    return res.status(201).json(tag);

  } catch (e) {
    return res.status(400).json({
      success: false,
      error: 'Error Saving Place',
      errorKey: 'PLACE_CREATE_ERROR',
    });
  }

}

async function listTags(res, req) {

  const user = req.userdata;
  const { userId } = req.body;

  const tagsSharedWithUser = user.sharedTags;
  let tagsList = await Tag.find({
    $or: [
      { user: userId },
      {
        $in: tagsSharedWithUser
      }
    ]
  }).populate('place').lean();
  return res.status(200).json(tagsList);
}


async function deleteTag(res, req) {
  const { tagId } = req.body;
  const tag = await Tag.findOne({ _id: tagId });

  if (!tag) {
    return res.status(400).json({
      success: false,
      error: 'Tag not found',
      errorKey: 'TAG_NOT_FOUND',
    })
  }
  tag.remove();
  return res.status(200).json({
    success: true
  });
}

export {
  createTag,
  deleteTag,
  listTags,
};
