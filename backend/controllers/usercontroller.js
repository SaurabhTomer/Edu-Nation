import User from "../models/user.model.js";
import { uploadOnCloudinary } from "./../config/claudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user error : ${error}` });
  }
};



export const updateProfile = async (req, res) => {
  try {
    
    const userId = req.userId;

    // Extract fields sent by the user
    const { description, name } = req.body;

    let photoUrl;

    // If a file is uploaded, upload it to Cloudinary
    if (req.file) {
      // Upload image and get a secure URL
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    // Build update object: only include fields that actually exist
    const updateData = {
      name,
      description,
    };

    if (photoUrl) {
      updateData.photoUrl = photoUrl; // Do not overwrite old URL if new file is not uploaded
    }

    // Find the user and update their profile
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // Return updated document
    });

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Successfully updated profile
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    // Internal server error
    return res.status(500).json({
      message: `Update Profile error: ${error.message}`,
    });
  }
};
