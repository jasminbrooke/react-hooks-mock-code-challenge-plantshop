import React, { useState } from "react";

function PlantCard({plant, onDeletePlant}) {
  const { id, name, image, price } = plant;

  const [isInStock, setIsInStock] = useState(true);

  const handleToggleStock = () => {
    setIsInStock(!isInStock);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    });
    onDeletePlant(id);
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleToggleStock}>In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
        <button onClick={handleDeleteClick}> Delete </button>
      )
    </li>
  );
}

export default PlantCard;
