import React from 'react';
import styles from '../../styles/ServiceCard.module.css';

import { useNavigate } from 'react-router-dom';

export default function ServiceCard({ title, description }) {

const navigate=useNavigate();

const handleClick=()=>{
  navigate(`/complaint/${title.toLowerCase()}`);
}

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
