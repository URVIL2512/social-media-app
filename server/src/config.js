require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sma',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
  HUGGINGFACE_API_TOKEN: process.env.HUGGINGFACE_API_TOKEN || '',
  HUGGINGFACE_API_ENDPOINT: 'https://api-inference.huggingface.co/models',
  HUGGINGFACE_DEFAULT_MODEL: 'stabilityai/stable-diffusion-2',
  HUGGINGFACE_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
