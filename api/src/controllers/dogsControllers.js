const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const infoCleaner = (dogsApi) => { 
    return dogsApi.map((dog) => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            height: dog.height.imperial,
            weight: dog.weight.imperial,
            age: dog.life_span,
            temperaments: dog.temperament,
            origin: "API"
        };
    });
};  // Limpia los datos de la API

const dogsDbWithTemperaments = (infoDB) => { 
    return infoDB.map(dog => {
        const temperaments = (dog.temperaments).map(temp => temp.name);   // Obtiene los nombres de los temperamentos asociados
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            age: dog.age,
            temperaments: temperaments.join(', '),
            origin: dog.origin
        };  // Crea un nuevo objeto con las propiedades de la raza y los temperamentos asociados
    })  // Mapea los resultados para agregar los temperamentos asociados a cada raza de perro de la BD
};

const getAllDogs = async () => {
    const infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
    const dogsApi = infoCleaner(infoApi);
        
    const infoDB = await Dog.findAll({
        include: Temperament  // Incluye los temperamentos asociados   
    });
    const dogsDB = dogsDbWithTemperaments(infoDB);

    return { "dogsBD": dogsDB, "dogsAPI": dogsApi }
}

const getDogById = async (id, source) => {
    const dog = source === "api"
        ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data
        : await Dog.findByPk(id, {
            include: Temperament  // Incluye los temperamentos asociados   
        });
      
    if (source === "api") {
        const dogWithImage = (await axios.get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}?api_key=${API_KEY}`)).data;
        return {
            id: dog.id,
            name: dog.name,
            image: dogWithImage.url,
            height: dog.height.imperial,
            weight: dog.weight.imperial,
            age: dog.life_span,
            temperaments: dog.temperament,
            origin: "API"
        }; 
    } else {
        const dogDB = dogsDbWithTemperaments([dog]);
        return dogDB
    }
}

const getDogByName = async (name) => {
    const infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)).data;
    const dogApi = infoCleaner(infoApi);
    
    const infoDB = await Dog.findAll(
        { 
            include: Temperament  // Incluye los temperamentos asociados   
        },
        {where: {name: name}} 
    );
    const dogsDB = dogsDbWithTemperaments(infoDB);

    return { "dogBD": dogsDB, "dogAPI": dogApi }
};

const createDogDB = async (name, image, height, weight, age, origin, temperamentNames) => {
    const post = await Dog.create({ name, image, height, weight, age, origin });

    if (temperamentNames && temperamentNames.length > 0) {
        const temperaments = await Temperament.findAll({
            where: {
                name: temperamentNames
            }
        });
        await post.addTemperaments(temperaments);
    }

    console.log('Raza de perro creada y temperamentos asociados con éxito');
    return post;
};

module.exports = { getAllDogs, getDogById, getDogByName, createDogDB }