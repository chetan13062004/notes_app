// API configuration for development and production environments
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://noteeee-main.vercel.app/api' // Replace with your actual Vercel deployment URL
  : 'http://localhost:5000/api';

export default API_BASE_URL;