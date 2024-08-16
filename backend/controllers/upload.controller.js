import download from 'image-downloader';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
