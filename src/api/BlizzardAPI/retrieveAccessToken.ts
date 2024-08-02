import axios from "axios";

const BLIZZ_USERNAME = import.meta.env.VITE_BLIZZ_USERNAME;
const BLIZZ_PASSWORD = import.meta.env.VITE_BLIZZ_PASSWORD

/**
 * Retrieves the OAuth Access Token for the Blizzard API
 * @returns Access Token for use in API calls to Blizzard
 */
const retrieveAccessToken = async () => {
  const response = await axios.post("https://us.battle.net/oauth/token", null, {
    auth: {
      username: BLIZZ_USERNAME,
      password: BLIZZ_PASSWORD,
    },
    params: {
      grant_type: "client_credentials",
    },
  });

  return response.data.access_token;
};

export { retrieveAccessToken };
