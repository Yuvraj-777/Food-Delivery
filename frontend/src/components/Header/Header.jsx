// Header.jsx

import React, { useState, useEffect } from 'react';
import './Header.css';
import { assets } from '../../assets/assets';

const Header = () => {
  const images = [
    assets.food_2,
    assets.food_3,
    assets.food_4,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='displayHeader'>
      <div className='header-container'>
        {/* Left side - YouTube video */}
        <div className='video-section'>
        <div className="video-wrapper">
        <div className="background-video-container">
  <iframe 
    src="https://www.youtube.com/embed/m4o54JgYbV4?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=m4o54JgYbV4"
    title="Background Video"
    frameBorder="0"
    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>

</div>

          </div>
        
        {/* Subtle divider line */}
        <div className="subtle-divider"></div>
        
        {/* Right side - Image slider */}
        <div className='slider-section'>
          <div className='image-slider'>
            <img src={images[currentIndex]} alt={`Food ${currentIndex + 1}`} className='slider-image' />
            <div className='slider-indicators'>
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section below the visual elements */}
      <div className='header-contents'>
  <h2>Indulge in Exquisite Culinary Delights</h2>
  <p>Discover a curated selection of gourmet cuisine, masterfully prepared using the finest, premium ingredients. Elevate every moment with a dining experience designed to delight the senses.</p>
  <a href="#food-display"><button className='buttonwl'>Explore the Menu</button></a>
</div>

    </div>
  );
};

export default Header;