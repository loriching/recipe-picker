import './Home.css';
import Dashboard from "./Dashboard";
import SearchBar from "./SearchBar";
import FilterControls from "./FilterControls";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function Home({searchQuery, setSearchQuery, filters, changeFilter, filteredRecipes}) {
  return (
    <>
        <div className='whole-page'>
          <h1 className="page-title">Great Recipes!</h1>

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <h4>Search for recipes in the searchbar, or use filters to find meals that meet your nutrition goals!</h4>
          
          <FilterControls filters={filters} changeFilter={changeFilter} />
          <br></br><br></br>

          {filteredRecipes ? <Dashboard recipes={filteredRecipes}/> : <p>No recipes found.</p>}
        </div>
    </>
  );
}

export default Home;