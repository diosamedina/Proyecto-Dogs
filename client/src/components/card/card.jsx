import { Link } from "react-router-dom";
import "./card.css";
import React from "react";

function Card({ name, image, temperaments, weight, id }) {
    return (
        <div className="card-container">
            <Link to={`/detail/${id}`}>
                <h2>{name}</h2>
                <img src={image} alt={name} className="card-image" />
                <h4>{temperaments}</h4>
                <h4>{weight}</h4>
                {/* {temperaments?.map((temperament, index) => (
                    <h4 key={index}>{temperaments}</h4>
                 ))} */}
            </Link>
        </div>
    );
}

export default Card;