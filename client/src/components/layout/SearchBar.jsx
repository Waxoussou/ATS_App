import React, { useState } from 'react';
import './searchBar.css';

const SearchBar = ({ handleSearch }) => {

    // const [search, setSearch] = useState('')
    // const handleChange = e => {
    //     const { value: searchvalue } = e.target;
    //     handleSearch(searchvalue);
    // }

    return <div className='searchBar-container'>
        <i className="fas fa-search"></i>
        <input onChange={handleSearch}
            type="text" name="search" id="search__input"
            placeholder='Search by skills' />
    </div>
}

export default SearchBar;