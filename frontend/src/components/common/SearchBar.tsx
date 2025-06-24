import { useState } from "react";
import "../../styles/components/common/searchBar.scss"

function SearchBar(searchTerm: string, setSearchTerm: (searchTerm: string) => void) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Rechercher un menu, un restaurant, un type de cuisine..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </div>
    );
}

export default SearchBar;