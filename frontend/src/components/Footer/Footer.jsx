import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="footer-branding">
            <img className='tomatologofooter' src={assets.logo} alt="Eatzio Logo" />
            <h2 className="footer-tagline">Delicious food, delivered</h2>
          </div>
          <p>This website is just for my portfolio, it's not a real website.</p>
          <div className="footer-social-icons">
            <a href="#" aria-label="Facebook"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="#" aria-label="Twitter"><img src={assets.twitter_icon} alt="Twitter" /></a>
            <a href="#" aria-label="LinkedIn"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
          </div>
        </div>
        
        <div className="footer-content-center">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/story">Our Story</a></li>
            <li><a href="/delivery">How We Deliver</a></li>
            <li><a href="/terms">Terms & Privacy</a></li>
          </ul>
        </div>
        
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li><i className="phone-icon"></i> +0-123-456-7890</li>
            <li><i className="email-icon"></i> contact@Eatzio.com</li>
            <li><button className="newsletter-btn">Subscribe to Newsletter</button></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <hr/>
        <div className="footer-bottom-content">
          <p className='footer-copyright'>Copyright {currentYear} © Eatzio.com - All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/sitemap">Sitemap</a>
            <a href="/cookies">Cookies</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer