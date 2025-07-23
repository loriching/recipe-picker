const SearchBar = ({searchQuery, setSearchQuery}) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search for a recipe..."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value);
                }}
            />
        </div>
    )
    
}

export default SearchBar;