import React, { useState } from 'react';
import '../styles/contact.css';

function CreativeContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
    console.log('Form Submitted', formData);
  };

  return (
    <div className="contact-page-creative">
      <div className="contact-cosmic-bg">
        <div className="contact-galaxy-overlay"></div>
        
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Let's Connect</h1>
            <p className="contact-subtitle">Bridging Ideas, Sparking Conversations</p>
          </div>

          <div className="contact-content-creative">
            <div className="contact-form-cosmic">
              <form onSubmit={handleSubmit}>
                <div className="input-orbit">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    required 
                  />
                  <span className="input-icon">👤</span>
                </div>

                <div className="input-orbit">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email" 
                    required 
                  />
                  <span className="input-icon">✉️</span>
                </div>

                <div className="input-orbit">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message" 
                    required 
                  ></textarea>
                  <span className="input-icon">💬</span>
                </div>

                <button type="submit" className="cosmic-send-btn">
                  Send Your Transmission
                </button>
              </form>
            </div>

            <div className="contact-details-creative">
              <div className="contact-detail-card">
                <div className="detail-icon">📍</div>
                <div className="detail-text">
                  <h3>Headquarters</h3>
                  <p>123 Innovation Lane, Tech City</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="detail-icon">📞</div>
                <div className="detail-text">
                  <h3>Connect Directly</h3>
                  <p>+1 (555) CONNECT</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="detail-icon">✉️</div>
                <div className="detail-text">
                  <h3>Digital Mailbox</h3>
                  <p>hello@innovate.world</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreativeContact;