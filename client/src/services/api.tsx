import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchSellerCategories = async (sellerId: string | undefined) => {
  const response = await axios.get(`${API_BASE_URL}/sellers/${sellerId}`);
  return response.data.categories;
};

export const createListing = async (listingData: any) => {
  const response = await axios.post(`${API_BASE_URL}/listings`, listingData);
  return response.data;
};
 

export const registerSeller = async (data: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/seller/register`,
    data
  );
  return response.data;
};

export const googleAuthBuyer = () => {
  window.location.href = `${API_BASE_URL}/auth/buyer/google`;
};
