import axios from "axios";

export async function getAndDownloadImage(url: string, accessToken: string, className?: string, specName?: string) {
  try {
    const response = await axios.post('http://localhost:3001/download-image', {
      url,
      accessToken,
      className,
      specName
    });
    console.log(response.data.message);
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data.message : error.message);
  }
}