import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ComplaintForm(){


    const {serviceType}=useParams();
    const [username, setUsername] = useState('');    
    const [number, setNumber] = useState('');
    const [details, setDetails] = useState('');

const handleSubmit=(e)=>{

   e.preventDefault();
    alert(`Complaint submitted for ${serviceType}\nName: ${username}\nDetails: ${details}`);

    setUsername('');
    setNumber("")
    setDetails('');

 //add location

}



    return(
        <>

      <form onSubmit={handleSubmit}>
        
         <label>Your Name:</label>
        <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} />
        <br /><br />

        <label>Phone Number:</label>
        <input type="number"  value={number} onChange={(e) => setNumber(e.target.value)} />
        <br /><br />

        <label>Complaint Details:</label><br />
        <textarea  value={details}   onChange={(e) => setDetails(e.target.value)} ></textarea>
        <br /><br />

        <button type="submit">Submit</button>

        <p>add location</p>
        
        </form>  
        
        </>
    )
}