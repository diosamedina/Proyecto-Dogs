import React, { useState } from 'react';
import Card from "../card/card";
import "./cards.css";

function Cards({ allDogs }) {
    let dogs = allDogs;
    if (!Array.isArray(dogs)) dogs = [dogs];
    console.log('dogs: ', dogs)
    const [ currentPage, setCurrentPage ] = useState(1);
    const dogsPerPage = 8;

    // Calcular el índice de la primera y última raza en la página actual
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);  // Función para cambiar de página

    return (
            <div className="cards-container">
                {currentDogs.map((dog, index) => (
                    <Card 
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weight={dog.weight}
                    />
                ))}
                {/* Controles de paginación */}
                <div>
                    {Array.from({ length: Math.ceil(allDogs.length / dogsPerPage) }, (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
    );
}

export default Cards;