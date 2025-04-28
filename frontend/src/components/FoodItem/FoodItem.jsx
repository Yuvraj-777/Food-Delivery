// FoodItem.jsx
import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-top">
        <div className="food-item-price-tag">
          <span>₹{price}</span>
        </div>
        <div className="food-item-img-container">
          <img className='food-item-image' src={image} alt={name} />
        </div>
      </div>
      
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className='namewe'>{name}</p>
          <div className="food-item-stars">
            <span>★★★★☆</span>
          </div>
        </div>
        
        <p className="food-item-desc">{description}</p>
        
        <div className="food-item-bottom">
          {!cartItems[id] ? (
            <button className="food-item-add-btn" onClick={() => addToCart(id)}>
              Add to Cart
            </button>
          ) : (
            <div className='food-item-counter'>
              <button className="counter-btn minus" onClick={() => removeFromCart(id)}>−</button>
              <p className='cartitemsp'>{cartItems[id]}</p>
              <button className="counter-btn plus" onClick={() => addToCart(id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItem;