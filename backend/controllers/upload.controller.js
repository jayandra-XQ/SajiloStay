import download from 'image-downloader';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


// Initialize Multer for multiple file uploads
const upload = multer({ storage: storage }).array('photos', 10); // 'photos' is the form field name, max 10 files



export const uploadByLink = async (req, res) => {
  try {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const uploadPath = path.join(__dirname, 'uploads', newName);

    await download.image({
      url: link,
      dest: uploadPath, // will download to the 'uploads' directory
    });

    res.json({ filePath: `uploads/${newName}` }); // Return the relative path to the file
  } catch (error) {
    console.log("Error downloading the image: " + error.message);
    res.status(500).json({ message: 'Error downloading the image', error });
  }
}

// uploadByFile function
export const uploadByFile = async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading the files: " + err.message);
      return res.status(500).json({ message: 'Error uploading the files', error: err });
    }

    // If no files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const filePaths = req.files.map(file => `uploads/${file.filename}`);
    res.json({ filePath: filePaths }); // Return an array of uploaded file paths
  });
};
