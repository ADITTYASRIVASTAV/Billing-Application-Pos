import React, { useState } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const Product = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Men Geometric Print Polo Neck Pure Cotton Black T-Shirt",
      category: "shirt",
      price: 599,
      stock: 10,
      description: "Wished only one time no issues good quality"
    },
    {
      id: 2,
      name: "Men Slim Fit Checkered Spread Collar Casual Shirt (Pack of 2)",
      category: "t-shirt",
      price: 399,
      stock: 15,
      description: "Good choice for single boy"
    },
    {
      id: 3,
      name: "Self Design Georgette Stitched Anarkali Gown (Green)",
      category: "women_dress",
      price: 599,
      stock: 8,
      description: "Designed with full sleeves and a round neckline..."
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length + 1
    };
    setProducts([...products, product]);
  };

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from an API
    console.log('Refreshing data...');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <ProductTable
        products={products}
        onAddProduct={() => setShowForm(true)}
        onRefresh={handleRefresh}
      />
      
      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Product;