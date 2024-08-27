import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

const API_SECRET = process.env.API_SECRET;

const CLOUD_NAME = process.env.CLOUD_NAME;

const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;
const AUTH = {
  username: API_KEY,
  password: API_SECRET,
};
app.get('/photos', async (req, res) => {
  console.log(req.query);
  try {
    const { data } = await axios.get(BASE_URL + '/resources/image', {
      auth: AUTH,
      params: {
        next_cursor: req.query.next_cursor,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.response.data);
    return res
      .status(500)
      .json({ message: `something went wrong: ${error.message}` });
  }
});

app.get('/search', async (req, res) => {
  console.log(req.query);
  try {
    const { data } = await axios.get(BASE_URL + '/resources/search', {
      auth: AUTH,
      params: {
        expression: req.query.expression,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.response.data);
    return res
      .status(500)
      .json({ message: `something went wrong: ${error.message}` });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
