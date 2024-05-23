import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

function Landing() {
  const navigate = useNavigate();

  function enterSite() {
    navigate('/home');
  }

  return (
    <div className="landing-container">
      <h1>¡Bienvenidos al mundo de los perros!</h1>
      <button onClick={ enterSite }>Entrar al sitio</button>
    </div>
  );
}

export default Landing;