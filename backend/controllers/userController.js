import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";

// ✅ Get Current Logged In User
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log("GET USER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP:", otp);

    res.status(200).json({ message: "OTP sent", otp });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP required" });
    }

    if (otp === "123456") {
      return res.status(200).json({ message: "OTP verified" });
    }

    return res.status(400).json({ message: "Invalid OTP" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Upload / Update Profile (FIXED)
export const uploadProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;

    let photoUrl;

    // ✅ agar file hai to upload karo
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      if (uploaded && uploaded.secure_url) {
        photoUrl = uploaded.secure_url;
      } else {
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ update fields
    user.name = name || user.name;
    user.description = description || user.description;

    if (photoUrl) {
      user.photoUrl = photoUrl;
    }

    await user.save();

    return res.status(200).json(user);

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};