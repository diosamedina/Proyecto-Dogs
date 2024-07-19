const { getAllDogs, getDogById, getDogByName, createDogDB } = require("../controllers/dogsControllers");

const getDogsHandler = async (req, res) => { 
    const { name } = req.query;
    try {
        if (name) {
            const dogByName = await getDogByName(name.toLowerCase());
            res.status(200).json(dogByName);
        } else {
            const response = await getAllDogs()
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const response = await getDogById(id, source);
        res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({ error: error.message })
    } 
};

const createDogHandler = async (req, res) => { 
    const { name, image, height,  weight, age, origin, temperamentNames } = req.body;
    console.log(name, image, height,  weight, age, origin, temperamentNames)
    try {
        const newDog = await createDogDB(name.toLowerCase(), image, height,  weight, age, origin, temperamentNames);
        res.status(200).json(newDog);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getDogsHandler,
    getDetailHandler,
    createDogHandler
}