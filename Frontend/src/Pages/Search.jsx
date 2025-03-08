import Header from "../Components/Header";
import SearchBar from "../Components/Search/SearchBar";
import Products from "../Components/Search/Products";

import '../styles/Search/Search.css';
import Footer from "../Components/Footer";

export default function Search () {
    return (
        <div className="Search">
            <Header />
            <SearchBar />
            <Products />
            <Footer />
        </div>
    )
}