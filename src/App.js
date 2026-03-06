import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import "./App.css";

function App() {

const [ingredient,setIngredient] = useState("");
const [recipes,setRecipes] = useState([]);

const searchRecipes = async () => {

if(!ingredient) return;

const response = await fetch(
`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
);

const data = await response.json();

setRecipes(data.meals || []);
};

return (

<div className="container">

<h1>🍲 Recipe Finder</h1>

<div className="searchBox">

<input
type="text"
placeholder="Enter ingredient (ex: chicken)"
value={ingredient}
onChange={(e)=>setIngredient(e.target.value)}
/>

<button onClick={searchRecipes}>
Search
</button>

</div>

{recipes.length === 0 && ingredient !== "" &&
<p className="noResult">No recipes found</p>
}

<div className="recipes">

{recipes.map((recipe)=>(
<RecipeCard key={recipe.idMeal} recipe={recipe}/>
))}

</div>

</div>

);
}

export default App;