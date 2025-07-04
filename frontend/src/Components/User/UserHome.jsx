// src/Components/User/UserHome.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import './UserHome.css';
import UserNav from './UserNav';

export default function UserHome() {
  const { username } = useParams();

  const services = [
    { title: "Electricity", description: "Book complaints about electricity in your area!" },
    { title: "Road", description: "Book complaints about road issues in your area!" },
    { title: "Water", description: "Book complaints about water leaks, water scarcity, etc." },
    { title: "Others", description: "Have any other complaints? Register them here!" }
  ];

  return (
    <div className="user-home-container">
      <UserNav />

      <div className="user-home-content">
        <h1>Welcome, {username}!</h1>
        <p>Select a service to register your complaint:</p>

        <div className="service-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
