import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import Header from "./components/Header";
import Home from "./components/Home";
import InfoPage from "./components/InfoPage";
import Details from "./components/Details";

function App() {
  const NoMatch = () => {
    return (
        <>
            <h3>Sorry, that page doesn't exist!</h3>
            <p>Click below to return to the home page.</p>
            <Link to="/">Home</Link>
        </>
    );
  }

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index={true} element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} filters={filters} changeFilter ={changeFilter} filteredRecipes={filteredRecipes} />} />
            <Route index={false} path="/details/:id" element={<Details filteredRecipes={filteredRecipes}/>} />
            <Route index={false} path="/about" element={<InfoPage />}/>
          </Route>
          <Route path="*" element={<NoMatch />}/>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;