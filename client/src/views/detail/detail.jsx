import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar'
// import './detail.css';

function Detail(props) {
  const { id } = useParams();
  const [ dog, setDog ] = useState({});
  
  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setDog(data);
          console.log(data);
        } else {
          window.alert('¡No hay razas con este ID!');
        }
      }
    )
    return setDog({});
  }, [id]);

  return (
    <div>
      <Navbar />
      <h1>Detail</h1>
      <h2>{dog.name}</h2>
      <img src={dog.image} alt={dog.name} />
      <h3>Altura: {dog.height}</h3>
      <h3>Peso: {dog.weight}</h3>
      <h3>Años de Vida: {dog.age}</h3>
      <h3>Temperamentos: {dog.temperaments}</h3>
    </div>
  );
}

export default Detail;