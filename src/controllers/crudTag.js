import Place from '../models/place';
import User from '../models/user';
import Tag from '../models/tag';

async function createTag(req, res) {

  const user = req.userdata;
  const { location, name, title, description, image } = req.body;

  if (!location.lat || !location.lng) {
    return res.status(400).json({
      success: false,
      error: 'Place location is not valid',
      errorKey: 'PLACE_LOCATION_NOT_VALID',
    });
  }

  try {
    let place = await Place.findOne({
      location: location,
      ...(name) && { name },
    })

    if (!place) {
      const newPlace = new Place({
        location: location,
        ...(name) && { name },
        ...(title) && { title },
        ...(description) && { description },
      });
      await newPlace.save();
      place = newPlace;
    }

    const tag = await Tag.create({
      place: place.id,
      user: user.user,
      ...(image) && { image },
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

async function listTags(req, res) {

  const user = req.userdata;

  const tagsSharedWithUser = user.sharedTags || [];
  let tagsList = await Tag.find({
    $or: [
      { user: user.user },
      {
        _id: { $in: tagsSharedWithUser }
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
