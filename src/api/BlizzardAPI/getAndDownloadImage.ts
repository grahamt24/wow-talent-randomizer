import axios from "axios";

/**
 * Downloads an image from a specified URL and saves it to a local directory. See src/api/express/server.js for more.
 *
 * NOTE: This should only need to be run when talent trees get out of date. This saves the image to the local machine which will then be
 * uploaded to Github. This is to prevent large amounts of requests to Blizzard's media API.
 *
 * @param url - The URL of the image to download.
 * @param accessToken - The access token for authentication.
 * @param className - Optional. The name of the class for organizing the image.
 * @param specName - Optional. The name of the specialization for organizing the image.
 * @returns A promise that resolves when the image has been downloaded.
 * @throws An error if the download fails or if the response is not as expected.
 */
async function getAndDownloadImage(
  url: string,
  accessToken: string,
  className?: string,
  specName?: string
) {
  try {
    const response = await axios.post("http://localhost:3001/download-image", {
      url,
      accessToken,
      className,
      specName,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

export { getAndDownloadImage };
