import React from 'react';
import './searchBar.css';

const SearchBar = ({ handleSearch }) => {
    return <div className='searchBar-container'>
        <i className="fas fa-search"></i>
        <input onChange={handleSearch}
            type="text" name="search" id="search__input"
            placeholder='Search by name' />
    </div>
}

export default SearchBar;