import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Cards from "../../components/cards/cards";
import { getDogs, filterCards, orderCards } from '../../redux/actions';
import './home.css';

function Home() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.allDogs);  // Hook que permite a los componentes funcionales extraer y acceder la data desde el store de Redux  
  const [ searchName, setSearchName ] = useState("");  // Hook que permite manejar el estado en los componentes funcionales
  const [ selectedDog, setSelectedDog] = useState(null);  // Raza seleccionada
  
  const handleBack = () => {
    setSelectedDog(null);  // Para volver a la lista completa
  }

  function handleChange(event) {
    event.preventDefault();
    setSearchName(event.target.value);
  }

  function getDogByName(name) {
    axios(`http://localhost:3001/dogs?name=${name}`).then(
      ({ data }) => {
        console.log(data.dogAPI);
        if (data.dogAPI) {
          setSelectedDog(data.dogAPI);
        } else {
          window.alert('¡No hay razas con ese nombre!');
        }
      }
    )
  }

  function handleSubmit(event) {
    event.preventDefault();  
    getDogByName(searchName);
    setSearchName("")
  }

  function handleFilter(event) {
    dispatch(filterCards(event.target.value))
  }

  function handleOrder(event) {
    dispatch(orderCards(event.target.value))
  }

  useEffect(() => {
    dispatch(getDogs())
  }, [dispatch]);

  return (
    <div className="home">
      <h2 className="home-title">Home</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div>
        <select name='filter' onChange={handleFilter}>
          <option value="All">All</option>
          <option value="API">Origen API</option>
          <option value="BD">Origen BD</option>
        </select>
        <select name='order' onChange={handleOrder}>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>
          <option value="C">Peso</option>
        </select>
      </div>
      { selectedDog ? (
        <Cards allDogs={selectedDog} onBack={handleBack} />
      ) : (
        <Cards allDogs={allDogs} onBack={handleBack} />
      )}
    </div>
  );
}

export default Home;