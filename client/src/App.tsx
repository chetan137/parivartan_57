import React from "react";
import ListingForm from "./component/ListingForm";

const App: React.FC = () => {
  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <h1>Marketplace</h1>
      <ListingForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
