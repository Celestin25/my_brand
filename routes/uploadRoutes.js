const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

// Multer config
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ message: "Upload successful", url: result.secure_url });
  } catch (error) {
    console.error("Upload failed", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

module.exports = router;
