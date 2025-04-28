// MenuCategories.jsx
import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const MenuCategories = ({ category, setCategory }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  const handleCategoryClick = (itemName) => {
    if (expandedCategory === itemName) {
      // Clicking the same category again: collapse the detail card
      setExpandedCategory(null);
      setCategory("All");
    } else {
      // New category clicked: expand the detail card
      setExpandedCategory(itemName);
      setCategory(itemName);
    }
  };

  return (
    <div className="menu-categories" id="menu-categories">
      <div className="menu-categories-header">
        <h2 className="menu-categories-title">Menu Categories</h2>
        <p className="menu-categories-subtitle">Select a category to explore our culinary offerings</p>
      </div>
      
      <div className="categories-grid">
        {menu_list.map((item, index) => (
          <div 
            key={index} 
            className={`category-cell ${category === item.menu_name ? 'category-active' : ''}`}
            onClick={() => handleCategoryClick(item.menu_name)}
          >
            <div className="category-image-container">
              <img src={item.menu_image} alt={item.menu_name} />
              <div className="category-highlight"></div>
            </div>
            <span className="category-label">{item.menu_name}</span>
          </div>
        ))}
      </div>
      
      {expandedCategory && (
        <div className="category-detail-card">
          <div className="category-detail-header">
            <h3>{expandedCategory}</h3>
            <button 
              className="close-detail-btn"
              onClick={() => setExpandedCategory(null)}
              aria-label="Close details"
            >
              ×
            </button>
          </div>
          <div className="category-detail-content">
            <div className="category-detail-image">
              {menu_list.find(item => item.menu_name === expandedCategory) && (
                <img 
                  src={menu_list.find(item => item.menu_name === expandedCategory).menu_image} 
                  alt={expandedCategory} 
                />
              )}
            </div>
            <div className="category-detail-info">
              <p className="category-description">
                Explore our {expandedCategory.toLowerCase()} selection, featuring chef-curated dishes 
                made with premium ingredients and authentic recipes.
              </p>
              <div className="category-tags">
                <span className="category-tag">Chef's Choice</span>
                <span className="category-tag">Premium</span>
                <span className="category-tag">Featured</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="menu-categories-divider"></div>
    </div>
  );
};

export default MenuCategories;