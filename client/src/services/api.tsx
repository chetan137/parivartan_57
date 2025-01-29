import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// export const fetchSellerCategories = async (sellerId: string | undefined) => {
//   const response = await axios.get(`${API_BASE_URL}/sellers/current`);
//   return response.data.categories;
// };





// export const fetchSellerData = async (sellerId: string) => {
//   const response = await axios.get(`${API_BASE_URL}/seller/${sellerId}`);
//   return response.data;
// };

// Create Listing
export const createListing2 = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/listing/create`, data);
  return response.data;
};
export const registerSeller = async (data: any) => {
  return await axios.post(`${API_BASE_URL}/auth/seller/register`, { withCredentials: true }, data);
};
export const loginSeller = async (data: any) => {
  return await axios
    .post(`${API_BASE_URL}/auth/seller/login`, { withCredentials: true }, data)
    .then((res) => res.data);

};

export const googleAuthBuyer = () => {
  window.location.href = `${API_BASE_URL}/auth/buyer/google`;
};

export const createListing = async (formData: FormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/listing/create`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
export const fetchSellerData = async () => {
  const response = await axios.get(`${API_BASE_URL}/sellers`);
  return response.data;
};












export const fetchSellerDetails = async (sellerId: string) => {
  const response = await axios.get(`${API_BASE_URL}/sellers/${sellerId}`);
  return response.data;
};

// Create a listing
export const createListinglist= async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/listing/create`, data);
  return response.data;
};

// Upload images to Cloudinary
export const uploadImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("photos", file));

  const response = await axios.post(`${API_BASE_URL}/listing/upload`, formData);
  return response.data;
};
