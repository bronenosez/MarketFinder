import {useRef, useState} from 'react';
import '../../styles/index.css';
import '../../styles/Search/SearchBar.css';
import find_img from "../../img/find.svg"

export default function SearchBar () {
    const searchRef = useRef();
    const [searchValue, setSearchValue] = useState('');

    function handleSearchValue (e) {
      setSearchValue(e.target.value);
    }

    function handleRequest () {
      const searchName = searchRef.current.value.trim();
      
      if (searchName === '') {
        return 
      }

      console.log(searchName)
    }

    return (
        <div className="container searchBar">
          <div className="bar">
            <input 
              ref={searchRef}
              type="text"
              placeholder='Название товара' 
              value={searchValue}
              onChange={handleSearchValue}
            />

            <img 
              src={find_img}
              alt=""
              onClick={handleRequest} 
            />

          </div>
        </div>
    )
}