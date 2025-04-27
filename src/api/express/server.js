/* eslint-disable */
// This is a workaround to having an actual server that can store
// It just stores everything on local machine to the assets directory
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post("/download-image", async (req, res) => {
  const { url, accessToken, className, specName } = req.body;

  try {
    const {
      data: { id, media },
    } = await axios.get(url, { headers: { "Authorization": `Bearer ${accessToken}`}});
    const {
      data: { assets },
    } = await axios.get(media.key.href, { headers: { "Authorization": `Bearer ${accessToken}`}});
    const fileUrl = assets[0].value;
    const dirPath = path.join(
      __dirname,
      `../../assets/${className}/talents/${specName}/`
    );
    fs.mkdirSync(dirPath, { recursive: true });

    // Define the file path
    const filePath = path.join(dirPath, `${id}.jpg`);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      return res.status(200).send({ message: "File already exists", filePath });
    }

    // Write the file to the directory
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);

    res
      .status(200)
      .send({ message: "Image downloaded successfully", filePath });
  } catch (error) {
    res.status(500).send({
      message: "Error downloading image",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
