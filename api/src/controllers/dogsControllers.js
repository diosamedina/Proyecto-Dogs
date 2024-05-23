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
        console.log('dog: ', dog);
        const dogWithImage = (await axios.get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}?api_key=${API_KEY}`)).data;
        console.log(dogWithImage);
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
    console.log('controller: ', name);
    const infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)).data;
    console.log('infoApi: ', infoApi);
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

const createDogDB = async (name, image, height, weight, age, origin, temperamentId1, temperamentId2) => {
    const post = await Dog.create({name, image, height, weight, age, origin});
    
    if (temperamentId1) {
        const temperament1 = await Temperament.findByPk(temperamentId1);
        const dog1 = await Dog.findByPk(post.id);
        await temperament1.addDog(dog1);
    }
    
    if (temperamentId2) {
        const temperament2 = await Temperament.findByPk(temperamentId2);
        const dog2 = await Dog.findByPk(post.id);
        await temperament2.addDog(dog2);
    }
    
    console.log('Raza de perro creada y tipos asociados con éxito');
    return post
};

module.exports = { getAllDogs, getDogById, getDogByName, createDogDB }