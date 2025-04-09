import React from "react";
import "./ProductCard.css"; 

const ProductCard = ({ product }) => {
  console.log("product", product);
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} className="product-image" />
      <div className="product-details">
        <div className="product-title-1">{product.title}</div>
        <h3 className="product-title-1">₹{product.price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
