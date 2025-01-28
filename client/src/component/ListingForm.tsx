import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig.tsx";

interface ListingFormProps {
  sellerId: string; // Seller ID to fetch categories
}

const SellerListingForm: React.FC<ListingFormProps> = ({ sellerId }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState<any>({
    category: "",
    materialName: "",
    description: "",
    rate: "",
    quantity: "",
    photos: [],
  });

  // Fetch seller categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/sellers/${sellerId}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [sellerId]);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photos: Array.from(e.target.files) });
    }
  };

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, category: e.target.value });
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "photos") {
        (value as File[]).forEach((file) => form.append("photos", file));
      } else {
        form.append(key, value as string);
      }
    });

    try {
      await axios.post("/listings", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Listing created successfully!");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing.");
    }
  };

  return (
    <div>
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div>
          <label>Category</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Form Fields Based on Category */}
        {selectedCategory === "farmer" && (
          <>
            <div>
              <label>Material Name</label>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Rate</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {/* File Upload */}
        <div>
          <label>Photos</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default SellerListingForm;
