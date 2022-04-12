import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(response => response.json())
    .then(plantsArray => {
      setPlants(plantsArray);
    });
  }, []);

  const handleAddPlant = (newPlant) => {
    const updatedPlantsArray = [...plants, newPlant];
    setPlants(updatedPlantsArray);
  }

  const handleDeletePlant = (id) => {
    const updatedPlantsArray = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlantsArray);
  }

  const displayedPlants = plants.filter(plant => {
    if(searchTerm){
      return plant.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? plant : null
    }
    return plant
  })

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search setSearchTerm={setSearchTerm} />
      <PlantList 
        plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
