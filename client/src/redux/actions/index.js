import axios from "axios";
import { GET_DOGS, FILTER, ORDER, CREATE_DOG } from "./action-types";

export function getDogs() {
    return async function(dispatch) {
        const response = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: [...response.data.dogsAPI, ...response.data.dogsBD],
        });
    };
}

export function filterCards(origen) {
    return {
        type: FILTER,
        payload: origen,
    }
}

export function orderCards(order) {
    return {
        type: ORDER,
        payload: order,
    }
}

export function createDog(dog) {
    // console.log('dog: ', dog);
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/dogs', dog, {
                headers: {
                    'Content-Type': 'application/json'
                }  // Este último argumento asegura que Axios está configurado correctamente, especialmente si alguna configuración global de Axios o un middleware del backend podría estar interfiriendo
            });
            // console.log(response.data);
            return dispatch({
                type: CREATE_DOG,
                payload: response.data,
            });
        } catch (error) {
            console.error('Error creating dog breed', error.response);
            alert(error.message);
        } 
    };
}