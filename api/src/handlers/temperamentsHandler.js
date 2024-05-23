const { checkIfEmpty, populateTemperaments } = require("../controllers/temperamentsController")

const getTemperamentsHandler = async (req, res) => {  
    try {
        const empty = await checkIfEmpty();
        if (empty) {
            await populateTemperaments();
            return res.status(200).send('La tabla "temperaments" ha sido poblada')
        } else {
            return res.status(200).send('La tabla "temperaments" ya tenía datos')
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports = { 
    getTemperamentsHandler 
};