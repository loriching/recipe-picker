import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import FilterControls from "./components/FilterControls";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [recipes, setRecipes] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  });

  const changeFilter = (key, value) => {
    setFilters(prev => ({...prev, [key]: value}));
  }

  useEffect(() => {
      const getRecipe = async() => {
          const apiKey = API_KEY;
          const response = await fetch(`https://api.spoonacular.com/recipes/findByNutrients?minCalories=0&number=100&apiKey=${apiKey}`);

          const json = await response.json();
          console.log(json);
          setRecipes(json);
          setFilteredRecipes(json);
      }

      getRecipe().catch(console.error);

  }, []);

  const parseGrams = (value) => {
    if (typeof value !== "string") return 0;
    return parseFloat(value.trim().replace('g', '')) || 0;
  };

  useEffect(() => {
    if (!recipes) return;

    let filtered = recipes;

    if (searchQuery !== "") {
      filtered = filtered.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    filtered = filtered.filter(recipe => recipe.calories >= filters.calories &&
      parseGrams(recipe.carbs) >= filters.carbs &&
      parseGrams(recipe.protein) >= filters.protein &&
      parseGrams(recipe.fat) >= filters.fat
    );

    setFilteredRecipes(filtered);
  }, [recipes, searchQuery, filters]);

  return (
    <>
      <div className='whole-page'>
        <h1>Great Recipes!</h1>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <h4>Search for recipes in the searchbar, or use filters to find meals that meet your nutrition goals!</h4>
        

        <FilterControls filters={filters} changeFilter={changeFilter} />
        <br></br><br></br>

        {filteredRecipes ? <Dashboard recipes={filteredRecipes}/> : <p>No recipes found.</p>}
      </div>
    </>
  );
}

export default App;