// src/Components/User/ServiceCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/ServiceCard.module.css';

export default function ServiceCard({ title, description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to complaint form based on service title
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/user/complaint/${formattedTitle}`);
  };

  return (
    <div className={styles.service_card}>
      <h2>{title}</h2>
      <p>{description}</p>

      <button className={styles.serviceCardButton} onClick={handleClick}>
        Book Complaint
      </button>
    </div>
  );
}
