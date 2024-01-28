import axios from "@configs/axios";

const createCampaign = async () => {
  try {
    return await axios.get(`/create-campaign`);
  } catch (error) {
    console.log(error);
  }
};

const getSearchSong = async (search: string) => {
  try {
    const response = await axios.get(`/search-on-spotify?q=${search}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getTrackGenres = async () => {
  try {
    return await axios.get(`/track-genres`);
  } catch (error) {
    console.log(error);
  }
};

const getPackages = async () => {
  try {
    return await axios.get(`/get-packages`);
  } catch (error) {
    console.log(error);
  }
};

const getDates = async () => {
  try {
    return await axios.get(`/get-dates`);
  } catch (error) {
    console.log(error);
  }
};

const CampaignServices = {
  getSearchSong,
  getTrackGenres,
  getPackages,
  getDates,
  createCampaign,
};

export default CampaignServices;
