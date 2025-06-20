import React from 'react';
import ServiceCard from './ServiceCard';
import { useParams } from 'react-router-dom';

export default function UserHome() {

  const {username}=useParams()

  const services = [
    { title: "Electricity", description: "Book complaints about electricity in your area!" },
    { title: "Road", description: "Book complaints about road issues in your area!" },
    { title: "Water", description: "Book complaints about water leaks, water scarcity, etc." },
    { title: "Others", description: "Other complaints in your area?" }
  ];

  return (
    <div style={{ padding: '20px' }}>
    <h1>Welcome, {username}!</h1> 
      <p>Select a service to register your complaint:</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} description={service.description} />
        ))}
      </div>
    </div>
  );
}
