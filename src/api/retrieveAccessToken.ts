import axios from "axios";

export const retrieveAccessToken = async () => {
  const response = await axios.post('https://us.battle.net/oauth/token', null, {
    auth: {
      username: "10a90bea178d4404bfa4d43d4c72ab53",
      password: "f9Jq3ggDa9B3MH9d4kR8zqMK8UR6MNbV",
    },
    params: {
      grant_type: 'client_credentials',
    },
  });

  return response.data.access_token;
};