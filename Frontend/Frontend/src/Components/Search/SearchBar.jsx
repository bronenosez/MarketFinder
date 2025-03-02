import '../../styles/index.css';
import '../../styles/Search/SearchBar.css';
import find from "../../img/find.svg"

export default function SearchBar () {
    return (
        <div className="container searchBar">
          <div className="bar">
            <input type="text" placeholder='Название товара' />
            <img src={find} alt="" />

          </div>
        </div>
    )
}