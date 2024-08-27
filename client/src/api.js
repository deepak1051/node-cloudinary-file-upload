import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

export const getImages = async (nextCursor) => {
  try {
    const params = new URLSearchParams();
    if (nextCursor) {
      params.append('next_cursor', nextCursor);
    }

    const { data } = await axios.get(`${API_URL}/photos?${params}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchImages = async (searchValue, nextCursor) => {
  try {
    const params = new URLSearchParams();
    params.append(`expression`, searchValue);

    if (nextCursor) {
      params.append('next_cursor', nextCursor);
    }

    const { data } = await axios.get(`${API_URL}/search?${params}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
