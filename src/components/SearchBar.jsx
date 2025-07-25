import "./SearchBar.css";

const SearchBar = ({searchQuery, setSearchQuery}) => {
    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder="Search for a recipe... 🔍"
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value);
                }}
            />
        </div>
    )
    
}

export default SearchBar;