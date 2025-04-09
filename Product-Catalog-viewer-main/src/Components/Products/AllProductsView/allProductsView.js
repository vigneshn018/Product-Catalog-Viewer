import React from "react";
import "./allProductsView.css";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "./utils";
import logo from './uprio_logo.png';

export const AllProductsView = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let apiUrl = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          (currentPage - 1) * productsPerPage
        }`;
        if (debouncedSearchTerm) {
          apiUrl = `https://dummyjson.com/products/search?q=${searchTerm}`;
        }

        //
        const response = await fetch(`${apiUrl}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched products:", data.products);

        // Update allProducts with fetched products
        setAllProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, productsPerPage, debouncedSearchTerm]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="header">
      <div className="products" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="UPRIO Logo" style={{ marginRight: '10px', height: '50px' }} />
    </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <h1 style={{ textAlign: "center", color: "black"}}>UPRIO Products</h1>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="product-list">
              {allProducts.map((product) => (
                <Link to={`/products/${product.id}`}>
                  <ProductCard key={product.id} product={product} />
                </Link>
              ))}
            </div>
            <div className="pagination-buttons">
              <button className="pagination-button previous" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="pagination-button next" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <br></br>
      <footer className="footer">
              <div className="footer-top">
                  <div className="footer-section">
                      <h3>Get to Know Us</h3>
                      <ul>
                          <li>About Us</li>
                          <li>Careers</li>
                          <li>Press Releases</li>
                      </ul>
                  </div>
                  <div className="footer-section">
                      <h3>Connect with Us</h3>
                      <ul>
                          <li>Facebook</li>
                          <li>Twitter</li>
                          <li>Instagram</li>
                      </ul>
                  </div>
                  <div className="footer-section">
                      <h3>Let Us Help You</h3>
                      <ul>
                          <li>uprio@co.in</li>
                          <li>Returns Centre</li>
                          <li>100% Purchase Protection</li>
                      </ul>
                  </div>
              </div>
              <div className="footer-bottom">
                  <p>&copy; 2024 uprio. All Rights Reserved.</p>
              </div>
          </footer>
    </>
  );
};
