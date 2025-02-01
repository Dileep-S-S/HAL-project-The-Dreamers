import React from 'react';
import "../Styles/AboutUs.css" ;

const AboutUs = () => {
  return (
    <div className="about-us">
      <center>
      <header>
        <h1>About Us</h1>
      </header>
      <section>
        <h2>Our Mission</h2>
        <p>
          Our platform aims to connect rural laborers with farmers, solving key
          challenges faced in agriculture. We strive to create opportunities for
          laborers to find daily work and help farmers access reliable labor,
          tools, vehicles, and land. Our goal is to improve agricultural
          productivity and promote sustainable farming practices.
        </p>
      </section>
      <section>
        <h2>Our Services</h2>
        <ul>
          <li>
            <strong>Labor Connections:</strong> Laborers can showcase their skills
            and availability, making it easier for farmers to find the right
            workforce for their needs.
          </li>
          <li>
            <strong>Tool & Machinery Rentals:</strong> Farmers can rent tools,
            tractors, and other equipment from owners to ensure timely and
            efficient agricultural operations.
          </li>
          <li>
            <strong>Land Access:</strong> Farmers can access land for cultivation
            by renting available plots directly from landowners.
          </li>
        </ul>
      </section>
      <section>
        <h2>Why Choose Us?</h2>
        <p>
          We provide a seamless platform that reduces unemployment for laborers
          and makes it easier for farmers to find the necessary resources to
          enhance productivity. Our service offers quick access to job
          opportunities, reliable labor, and essential agricultural tools and
          land for rent.
        </p>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; 2025 RuralConnect. All rights reserved.</p>
            <p>Contact us: support@ruralconnect.com</p>
            <p>Email: info@ruralconnect.com</p>
          </div>
          <div className="footer-right">
            <p>Follow Us:</p>
            <div className="social-media">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook-logo.png" alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/twitter-logo.png" alt="Twitter" className="social-icon" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/linkedin-logo.png" alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram-logo.png" alt="Instagram" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      </center>
    </div>
  );
};

export default AboutUs;