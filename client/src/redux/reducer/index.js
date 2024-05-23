import { GET_DOGS, FILTER, ORDER, CREATE_DOG } from "../actions/action-types"

let initialState = { 
    allDogs: [], 
    allDogsCopy: [], 
    errors: {} };

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                allDogsCopy: action.payload
            }
        case FILTER:
            if (action.payload === "All") return {
                ...state, 
                allDogs: state.allDogsCopy
            }
            const filteredDogs = state.allDogs.filter(
                dog => dog.origin === action.payload
            )
            return {
                ...state,
                allDogs: filteredDogs
            }
        case ORDER:
            const orderCopy = [ ...state.allDogs ];
            
            if (action.payload === "A")
                orderCopy.sort((a,b) => a.id - b.id);
            if (action.payload === "D")
                orderCopy.sort((a,b) => b.id - a.id);
            if (action.payload === "C")
                orderCopy.sort((a, b) => {
                    const [minA, maxA] = a.weight.split(' - ').map(Number);
                    const [minB, maxB] = b.weight.split(' - ').map(Number);
                    const promedioA = (minA + maxA) / 2;
                    const promedioB = (minB + maxB) / 2;
                    return promedioA - promedioB;
                });
            return {
                ...state,
                allDogs: orderCopy
            }
        case CREATE_DOG:
            return {
                ...state,
                allDogs: action.payload,
            }            
        default:
            return state;
    }
}

export default rootReducer;