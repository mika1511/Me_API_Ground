import Profile from "../models/Profile.js";

// GET /profile
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

// POST /profile (Create profile)
export const createProfile = async (req, res, next) => {
  try {
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res
        .status(409)
        .json({ error: "Profile already exists. Use PUT to update." });
    }

    const profile = new Profile(req.body);
    await profile.save();

    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

// PUT /profile (Update profile)
export const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true }
    );

    if (!profile) {
      return res
        .status(404)
        .json({ error: "Profile not found. Use POST to create." });
    }

    res.json(profile);
  } catch (err) {
    next(err);
  }
};
