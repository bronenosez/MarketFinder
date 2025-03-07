import stockImg from "../../img/stock.png";

function Product({ h1 = "Iphone", p = "Cool phone", rate = 0, store = 'Apple', price = 0 }) {
    return (
        <div className="product">
            <img src={stockImg} alt="Product"/>

            <div className="product_text">
                <div className="product__name">
                   <h1>{h1}</h1>
                   <p className="product__name_p">Цена: {price}</p> 
                </div>
                
                <div className="rate">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.48 0C5.58 0 0 5.6 0 12.5C0 19.4 5.58 25 12.48 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.48 0ZM17.78 20L12.5 16.81L7.21 20L8.61 13.98L3.95 9.95L10.1 9.42L12.5 3.75L14.9 9.41L21.05 9.93L16.38 13.97L17.78 20Z" fill="#444"/>
                    </svg>
                    <p>{rate}</p>
                </div>
                <p className="store">Магазин: {store}</p>
                <p className="product__p">{p}</p>
            </div>
        </div>
    );
}


export default Product;