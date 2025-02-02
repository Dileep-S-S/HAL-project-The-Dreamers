import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <div className="image-slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`} 
            className={`slider-image ${index === currentImageIndex ? 'active' : ''}`} 
          />
        ))}
      </div>
      <div className='para-d'>
        <h2>Gravida</h2>
        <p className='para-dashboard'>Digital Platform for Labor
    Develops a web application where labour showcases his skills which will be visible for the 
     Land owners, where he can select or choose the workers who are needed, which in   
     turn boosts up the job opportunities.
Tool & Machinery , Vehicles Rent
     Some of the farmers cannot find vehicles or tools related to their work on time, our
     platform builds the connection between the tools or vehicle owner and
     to the person who requires it.
Agricultural Land Access for Farmers
     Farmers who want to work in Land for period of time but can’t access the available Lands
     nearby to them, this platform helps the Farmers to Locate such Lands.
    
</p>
      </div>
    </div>
  );
};

export default Dashboard;
