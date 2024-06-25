import search from "../../img/ic_search.png"
import React, { useState, useEffect } from 'react';
import "./Search.css"

const Search = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        onSearch(inputValue)
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(inputValue)
    }

    return (
        <div className="search-box">
            <input type="text" placeholder="Explorar destinos" onChange={handleInputChange} />
            <button><img src={search} alt="" /></button>
        </div>
    )
}

export default Search