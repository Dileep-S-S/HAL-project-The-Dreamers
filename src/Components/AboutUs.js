import React from 'react';
import "../Styles/AboutUs.css" ;
import Footer from './Footer';
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
        
            <p><strong>Labor Connections:</strong> Laborers can showcase their skills
            and availability, making it easier for farmers to find the right
            workforce for their needs.
            </p>
          
            <p><strong>Tool & Machinery Rentals:</strong> Farmers can rent tools,
            tractors, and other equipment from owners to ensure timely and
            efficient agricultural operations.
            </p>
            <p><strong>Land Access:</strong> Farmers can access land for cultivation
            by renting available plots directly from landowners.</p>
        
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
      </center>
      <Footer></Footer>
    </div>
  );
};

export default AboutUs;