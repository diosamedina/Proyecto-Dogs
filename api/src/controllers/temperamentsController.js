const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const checkIfEmpty = async () => {
    const count = await Temperament.count();
    const empty = count === 0 ? true : false;
    return empty
};  // Verifica si la tabla está vacía

const populateTemperaments = async () => {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);  // Obtiene las razas de perros de TheDogApi
        
    const temperamentsArray = data
      .map(breed => breed.temperament)  // Extrae temperamentos
      .filter(Boolean) // Filtra temperamentos no definidos
      .map(temp => temp.split(', '))  // Divide por comas
      .flat(); // Aplana el array de arrays
    
    const uniqueTemperaments = [...new Set(temperamentsArray)];  // Eliminar duplicados

    await Promise.all(uniqueTemperaments.map(async (name) => {
        await Temperament.findOrCreate({ where: { name } });
    }));  // Guarda cada temperamento en la base de datos

    console.log('Temperamentos guardados en la base de datos');
};  // Puebla la tabla con los temperamentos de las razas de perros de TheDogApi para su posterior consumo

module.exports = { checkIfEmpty, populateTemperaments }