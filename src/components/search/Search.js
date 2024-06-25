import search from "../../img/ic_search.png"
import React, { useState, useEffect } from 'react';
import "./Search.css"

const Search = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(inputValue)
    }

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input type="text" placeholder="Explorar destinos" onChange={handleInputChange} />
            <button tipe="submit"><img src={search} alt=""/></button>
        </form>
    )
}

export default Search