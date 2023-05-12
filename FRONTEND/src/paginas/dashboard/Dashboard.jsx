import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const token = document.cookie.replace('token=', '');
  const navigate = useNavigate();
useEffect(()=>{
  if(!token){
navigate('/')
  }
},[])

  return (
    <div>
      <h2>dashboard</h2>
      </div>
  )
}

export default Dashboard