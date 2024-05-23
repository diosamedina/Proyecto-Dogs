import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDog } from '../../redux/actions';
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
    temperamentId1: "",
    temperamentId2: ""
  });

  const [ errors, setErrors ] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    age: "",
    temperamentId1: "",
    temperamentId2: ""
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
    const { name, value } = event.target;
    setInput({
        ...input,
        [name]: value
    });
    setErrors(validate({
        ...input,
        [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.log('input: ', input);
    dispatch(createDog(JSON.stringify(input)));  // Convierte un objeto JavaScript en un objeto JSON
    navigate('/home')
  }

  return (
    <div className="form">
      <form id="dogForm" className="dog-form" onSubmit={handleSubmit}>
        <h2>Crear una raza</h2>
        <div className="input-group">
          <label>Nombre:</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            value={input.value} 
            placeholder='Ingrese el nombre de la raza...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.name}</p>
        </div>

        <div className="input-group">
          <label>Imagen:</label>
          <input 
            id='image' 
            name='image' 
            type='text' 
            value={input.value} 
            placeholder='Ingrese la URL de la imagen...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.image}</p>
        </div>
        
        <div className="input-group">
          <label>Altura:</label>
          <input 
            id='height' 
            name='height' 
            type='text' 
            value={input.value} 
            placeholder='Ingrese el rango de alturas...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.height}</p>
        </div>

        <div className="input-group">
          <label>Peso:</label>
          <input 
            id='weight' 
            name='weight' 
            type='text' 
            value={input.value} 
            placeholder='Ingrese el rango de pesos...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.weight}</p>
        </div>

        <div className="input-group">
          <label>Años de Vida:</label>
          <input 
            id='age' 
            name='age' 
            type='text' 
            value={input.value} 
            placeholder='Ingrese el rango de años de vida...'
            onChange={handleChange} 
          />
          <p style={{color:"coral"}}>{errors.age}</p>
        </div>      
       
        <div className="input-group">
          <label>Temperamento 1:</label>
          <select name='temperamentId1' value={input.temperamentId1} onChange={handleChange}>
            <option value='' >Ingrese un temperamento...</option>
            <option value='1'>Stubborn</option>
            <option value='2'>Curious</option>
            <option value='3'>Playful</option>
            <option value='4'>Adventurous</option>
            <option value='5'>Active</option>
            <option value='6'>Aloof</option>
            <option value='7'>Clownish</option>
            <option value='8'>Dignified</option>
            <option value='9'>Fun-loving</option>
            <option value='10'>Independent</option>
            <option value='11'>Happy</option>
            <option value='12'>Wild</option>
            <option value='13'>Hardworking</option>
            <option value='14'>Dutiful</option>
            <option value='15'>Outgoing</option>
            <option value='16'>Friendly</option>
            <option value='17'>Alert</option>
            <option value='18'>Confident</option>
            <option value='19'>Intelligent</option>
            <option value='20'>Courageous</option>
          </select>
        </div>      
         
        <div className="input-group">
          <label>Temperamento 2:</label>
          <select name='temperamentId2' value={input.temperamentId2} onChange={handleChange}>
          <option value='' >Ingrese un temperamento...</option>
            <option value='1'>Stubborn</option>
            <option value='2'>Curious</option>
            <option value='3'>Playful</option>
            <option value='4'>Adventurous</option>
            <option value='5'>Active</option>
            <option value='6'>Aloof</option>
            <option value='7'>Clownish</option>
            <option value='8'>Dignified</option>
            <option value='9'>Fun-loving</option>
            <option value='10'>Independent</option>
            <option value='11'>Happy</option>
            <option value='12'>Wild</option>
            <option value='13'>Hardworking</option>
            <option value='14'>Dutiful</option>
            <option value='15'>Outgoing</option>
            <option value='16'>Friendly</option>
            <option value='17'>Alert</option>
            <option value='18'>Confident</option>
            <option value='19'>Intelligent</option>
            <option value='20'>Courageous</option>
          </select>
        </div>      
        
        <button type='submit' disabled={Object.keys(errors).length > 0}>Crear raza</button> 
      </form>
    </div>
  );
}

export default Form;