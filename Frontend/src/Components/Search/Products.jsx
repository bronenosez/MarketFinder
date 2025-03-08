import Product from "./Product";
import filter__price from "../../img/filter__price.svg";
import filter__rating from "../../img/filter__rating.svg";


export default function Products () {
    const randomInt = Math.floor(Math.random() * 10)
    let itemsInfo = [
        {
            h1: 'Iphone',
            p: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rem ratione amet neque doloremque dolore veniam error et repudiandae
                repellendus praesentium porro, minima reiciendis eos a officiis totam rerum similique est!`,
            rate: "4.7",
            store: 'Eldorado',
            price: '3000'
        },

        {
            h1: 'MacBook',
            price: '40000'
        }
    ]
    
    itemsInfo = itemsInfo.concat(new Array(randomInt).fill({}));


    const defaultText = {
        h1: '...',
        p:'...',
        rate: '...',
        store: '...',
        price: '...'
    }

    return (
        <div className="container products">         

            <div className="products_head">
                <p className="results">Результаты ({itemsInfo.length})</p> 
                <div className="filter">
                    <img src={filter__price} alt="" />
                    <img src={filter__rating} alt="" />
                </div>
            </div>

            <div className="items">
                {itemsInfo.map((item, index) => (
                    <Product 
                        key={index}
                        h1={item.h1 || defaultText.h1}
                        p={item.p || defaultText.p}
                        rate={item.rate || defaultText.rate}
                        store={item.store || defaultText.store}
                        price={item.price || defaultText.price}
                    />
                ))}
            </div>
            
        </div>
    )
}
