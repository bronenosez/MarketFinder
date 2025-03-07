import Product from "./Product";
import filter__price from "../../img/filter__price.svg";
import filter__rating from "../../img/filter__rating.svg";


export default function Products () {
    const productsCount = 2;
    const h1 = 'iphone 13';
    const p = 'Этот стильный и удобный товар станет отличным дополнением вашего повседневного образа. Он сочетает в себе качество, функциональность и элегантный дизайн, подходящий для любых ситуаций.Этот стильный и удобный товар станет отличным дополнением вашего повседневного образа. Он сочетает в себе качество, функциональность и элегантный дизайн, подходящий для любых ситуаций.'

    return (
        <div className="container products">         

            <div className="products_head">
                <p className="results">Результаты ({productsCount})</p> 
                <div className="filter">
                    <img src={filter__price} alt="" />
                    <img src={filter__rating} alt="" />
                </div>
            </div>

            <div className="items">
              <Product  p={p} />  
              <Product h1={h1} />  
            </div>
            
        </div>
    )
}
