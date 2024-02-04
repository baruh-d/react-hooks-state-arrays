import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All")

  const foodsToDisplay = foods.filter((food)=>{
    if(filterBy === "all"){
      return true;
    }else{
      return food.cuisine === filterBy;
    }
  })

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    // setFoods((newFood)=>({foods: [...newFood.foods, newFood]}))
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
    console.log(newFood);
  }
  function handleFilterChange(e){
    setFilterBy(e.target.value);
  }
  function handleClick(id){
    // const newFoodArray = foods.filter((food)=> food.id !== id)
    const newFoodArray = foods.map((food)=>{
    if(food.id === id){
      return{
        ...food,
        heatLevel: food.heatLevel + 1,
      }; 
    }else{
        return food;
      }
    })
    setFoods(newFoodArray);
  }

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={()=>handleClick(food.id)}> 
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">all</option>
        <option value="American">american</option>
        <option value="Sichuan">sichuan</option>
        <option value="Thai">thai</option>
        <option value="Mexican">mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
