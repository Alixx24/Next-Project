"use client"; 
import Container from "@/components/Container";
import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: ""
  });

  const handleChangeProduct = (e) => {
    const { value, name } = e.target;
    
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = async () => {
    try {
      console.log(newProduct);
      
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/api/products",
        data: {
          id: Math.floor(Math.random() * 1000),
          image: newProduct.image,
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price
        }
      });
      
      console.log("Product added:", response.data);
      
      // ریست فرم بعد از موفقیت
      setNewProduct({
        title: "",
        price: "",
        image: "",
        description: ""
      });
      
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="bg-slate-300 p-4">
      <Container>
        <div className="grid grid-cols-3 gap-4">
          <input 
            onChange={handleChangeProduct} 
            type="text" 
            name="title"  
            value={newProduct.title}  
            placeholder="title" 
          />
          <input 
            onChange={handleChangeProduct} 
            type="text"  
            name="price"
            value={newProduct.price}
            placeholder="price" 
          />
          <input 
            onChange={handleChangeProduct} 
            type="text"  
            name="image"
            value={newProduct.image}
            placeholder="image" 
          />
        </div>
        <textarea 
          onChange={handleChangeProduct} 
          name="description"  
          value={newProduct.description}  
          className="w-full mt-4"  
          placeholder="description"
        ></textarea>
        <button 
          onClick={handleAddProduct} 
          className="bg-sky-100 text-dark rounded px-4 py-2"
        >
          Add Product
        </button>
      </Container>
    </div>
  );
}

export default Dashboard;