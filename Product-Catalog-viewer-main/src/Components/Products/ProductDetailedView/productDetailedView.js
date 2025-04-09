import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./productDetailedView.css";

export const ProductDetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `https://dummyjson.com/products/${id}`;
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched product details:", data);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Link to="/" className="back-button">
        {"Back"}
      </Link>
      {loading ? (
        <p className="loader">Loading...</p>
      ) : product ? (
        <div className="product-detail-container">
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-rating">Rating: {product.rating}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <p className="product-brand">Brand: {product.brand}</p>
            <p className="product-sku">SKU: {product.sku}</p>
            <p className="product-weight">Weight: {product.weight}g</p>
            <p className="product-dimensions">
              Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}
            </p>
            <p className="product-warranty">Warranty: {product.warrantyInformation}</p>
            <p className="product-shipping">Shipping: {product.shippingInformation}</p>
            <p className="product-availability">Availability: {product.availabilityStatus}</p>
            <p className="product-return-policy">Return Policy: {product.returnPolicy}</p>
            <p className="product-minimum-order">Minimum Order Quantity: {product.minimumOrderQuantity}</p>

            <div className="product-reviews">
              <h4>Reviews</h4>
              {product.reviews.map((review, index) => (
                <div key={index} className="review">
                  <p className="review-rating">Rating: {review.rating}</p>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-date">Date: {new Date(review.date).toLocaleDateString()}</p>
                  <p className="review-name">Reviewer: {review.reviewerName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};
