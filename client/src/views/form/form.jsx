import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDog } from '../../redux/actions';
import { temperaments } from '../../utils/temperaments';
import './form.css';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [ input, setInput ] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    age: "",
    temperamentNames: []
  });

  const [ errors, setErrors ] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    age: "",
    temperamentNames: []
  })

  const validate = (input) => {
    const errors = {};
    let regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/; // Permite nombres con espacios sin números
    let regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    let regexNumberUnderscore = /^[A-Za-z0-9\s.-]+$/;
    // let regexNumberUnderscore = /^[a-zA-Z0-9]+-[0-9]+(\.[0-9]+)?$/g;

    if (!input.name) errors.name = "Nombre de la raza";
    else if (!regexName.test(input.name)) errors.name = "Ingrese un nombre válido";

    if (!input.image) errors.image = "URL de la imagen";
    else if (!regexUrl.test(input.image)) errors.image = "Ingrese una URL válida";

    if (!input.height) errors.height = "Altura mínima-altura máxima";
    else if (!regexNumberUnderscore.test(input.height)) errors.height = "Ingrese un rango válido";

    if (!input.weight) errors.weight = "Peso mínimo-peso máximo";
    else if (!regexNumberUnderscore.test(input.weight)) errors.weight = "Ingrese un rango válido";

    if (!input.age) errors.age = "Rango de años de vida";
    else if (!regexNumberUnderscore.test(input.age)) errors.age = "Ingrese un rango válido";
    
    return errors;
  }

  const handleChange = (event) => {
    const { name, value, type, selectedOptions } = event.target;

    if (type === "select-multiple") {
        const values = Array.from(selectedOptions).map(option => option.value);
        setInput(prevInput => ({
          ...prevInput,
          [name]: [...new Set([...prevInput[name], ...values])]
        }));
    } else {
        setInput(prevInput => ({
          ...prevInput,
          [name]: value
        }));
        setErrors(validate({
          ...input,
          [name]: value
        }));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createDog(input));
    alert('Raza creada exitosamente')
    navigate('/home')
  }

  return (
    <div className="form">
      <form className="dog-form" onSubmit={handleSubmit}>
        <h2>Crear una raza</h2>
        <div className="input-group">
          <label htmlFor="name">Nombre:</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            value={input.name} 
            placeholder='Ingrese el nombre de la raza...'
            onChange={handleChange}
            autoComplete="off"  // Agregar atributo autocomplete
          />
          <p style={{color:"coral"}}>{errors.name}</p>
        </div>

        <div className="input-group">
          <label htmlFor="image">Imagen:</label>
          <input 
            id='image' 
            name='image' 
            type='text' 
            value={input.image} 
            placeholder='Ingrese la URL de la imagen...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.image}</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="height">Altura:</label>
          <input 
            id='height' 
            name='height' 
            type='text' 
            value={input.height} 
            placeholder='Ingrese el rango de alturas...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.height}</p>
        </div>

        <div className="input-group">
          <label htmlFor="weight">Peso:</label>
          <input 
            id='weight' 
            name='weight' 
            type='text' 
            value={input.weight} 
            placeholder='Ingrese el rango de pesos...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.weight}</p>
        </div>

        <div className="input-group">
          <label htmlFor="age">Años de Vida:</label>
          <input 
            id='age' 
            name='age' 
            type='text' 
            value={input.age} 
            placeholder='Ingrese el rango de años de vida...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.age}</p>
        </div>      

        <div className="input-group">
          <label htmlFor="temperamentNames">Temperamentos:</label>
          <select name="temperamentNames" id="temperamentNames" multiple value={input.temperamentNames} onChange={handleChange}>
          {temperaments && temperaments.map((temperament, index) => (
              <option key={index} value={temperament}>{temperament}</option>
            ))}
          </select>
        </div>
        
        <button type='submit' disabled={Object.keys(errors).length > 0}>Crear raza</button> 
      </form>
    </div>
  );
}

export default Form;