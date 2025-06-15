// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const fetchAssets = async () => {
  const response = await api.get("/assets");
  return response.data;
};

export const createAsset = async (assetData: any) => {
  const response = await api.post("/assets", assetData);
  return response.data;
};

// Add more API calls as needed
