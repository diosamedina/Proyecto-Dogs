import React, { useState } from 'react';
import Card from "../card/card";
import "./cards.css";

function Cards({ allDogs, onBack }) {
    let dogs = allDogs;
    let regresar = !Array.isArray(dogs);

    if (regresar) {
        dogs = [dogs];  // Para que siempre trabaje con un array
    }

    const [ currentPage, setCurrentPage ] = useState(1);
    const dogsPerPage = 8;

    // Calcular el índice de la primera y última raza en la página actual
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    
    const paginate = pageNumber => setCurrentPage(pageNumber);  // Función para cambiar de página

    return (
        <div>
            {regresar && (
                <button onClick={onBack} className="back-button">Regresar</button>
            )}
            <div className="card-list">
                {currentDogs.map((dog, index) => (
                    <Card 
                        key={dog.id}
                        id={dog.id}
                        nombre={dog.name}
                        imagen={dog.image}
                        tipos={dog.temperaments}
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
        </div>
    );
}

export default Cards;
