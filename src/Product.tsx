import React from "react";
import "./Product.css";

const Product: React.FC = () => {
  return (
    <div className="product-container">
      {/* Background Embed */}
      <iframe
        src="https://my.spline.design/dunes-Ey2C7Nf6y0pjpQ2Nm5DfnsTF/"
        title="background"
        className="background-vframe"
      ></iframe>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <span className="brand">Ayushvardhan</span>
        </div>
        <nav className="nav-links">
          <a href="#icd">ICD-11/TM2</a>
          <a href="#namaste">NAMASTE CODES</a>
          <button className="home-btn">HOME</button>
        </nav>
      </header>

      {/* Product Section */}
      <main className="product-section">
        <h1 className="product-title">Welcome to Ayushvardhan</h1>
        <p className="product-description">
          Explore ICD-11, TM2, and NAMASTE codes with an interactive 3D background.
        </p>
        <button className="product-btn">Get Started</button>
      </main>
    </div>
  );
};

export default Product;
