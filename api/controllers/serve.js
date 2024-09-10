import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const servefile = async (req, res, next) => {
    const  quality  = 720;
    const name = "Nature";
    console.log("Called the backend with ");
    console.log(name);
    try {
      // Map the quality parameter to the correct file name
      const fileMap = {
        240: `${name}_output_240p.m3u8`,
        480: `${name}_output_480p.m3u8`,
        720: `${name}_output_720p.m3u8`,
      };
      const filePath = path.join(__dirname, '../services/transcoded', fileMap[quality]);
  
      // Check if the file exists and serve it
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    } catch (err) {
      console.error('Error serving video:', err);
      console.log(err);
      next(err);
    }
  };