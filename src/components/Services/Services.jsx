import { useState } from 'react';
import './services.css';

function Services() {
  const services = [
    { 
      name: 'Air Conditioning Installation', 
      description: 'Professional installation of air conditioning units for residential and commercial properties.',
      image: 'src/assets/images/install.png',
    },
    { 
      name: 'Air Conditioning Repair', 
      description: 'Expert repair services for all major brands and types of air conditioning systems.',
      image: 'src/assets/images/repair.png',
    },
    { 
      name: 'Maintenance Services', 
      description: 'Regular maintenance checks to ensure optimal performance and efficiency.',
      image: 'src/assets/images/maintenance.png',
    },
    { 
      name: 'Duct Cleaning', 
      description: 'Thorough cleaning of ducts to improve air quality and system efficiency.',
      image: 'src/assets/images/cleaning.png',
    },
    { 
      name: 'HVAC Consultation', 
      description: 'Consultation services to help you choose the right HVAC solutions for your needs.',
      image: 'src/assets/images/survey.png', 
    },
    { 
      name: 'Emergency Services', 
      description: '24/7 emergency services for urgent repair needs.',
      image: 'src/assets/images/refill.png',
    },
  ];

  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedService || !date || !name || !contact || !address) {
      alert('Please complete all fields.');
      return;
    }

    console.log({
      selectedService,
      date,
      name,
      contact,
      address
    });

    setSubmitted(true);
    setDate('');
    setName('');
    setContact('');
    setAddress('');
    setSelectedService(null);
  };

  return (
    <section id="services">
      <h2>Our Services</h2>
      <div className="service-list">
        {services.map((service, index) => (
          <div 
            className={`card ${selectedService === service.name ? 'selected' : ''}`}
            key={index}
            onClick={() => setSelectedService(service.name)}
          >
            <img src={service.image} alt={service.name} className="card-image" />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {selectedService && !submitted && (
        <div className="services-form-wrapper">
          <div className="close-btn" onClick={() => setSelectedService(null)}>
            &times;
          </div>

          <form className="services-form" onSubmit={handleSubmit}>
            <h3>Request for: {selectedService}</h3>

            <label>
              Select Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getMinDate()}
                required
              />
            </label>

            <label>Full Name:</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Contact Number:</label>
            <input 
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />

            <label>Address:</label>
            <textarea 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>

            <button type="submit">Request Service</button>
          </form>
        </div>
)}


      {submitted && (
        <div className="success-message">
          <h3>✅ Request Received!</h3>
          <p>We will contact you to confirm your schedule.</p>
        </div>
      )}
    </section>
  );
}

export default Services;
