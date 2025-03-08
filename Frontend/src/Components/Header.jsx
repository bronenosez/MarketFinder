import "../styles/Header.css";
import '../styles/index.css';
import logo__basket from "../img/logo__basket-svg.svg";
import info from "../img/info.svg";
import Modal from "./Modal";
import {useState} from 'react';

export default function Header () {

    const [condition, setCondition] = useState(false);

    function handleConditionState (condition) {
        setCondition((condition) => (!condition))
    }
    
    return (
        <header>
            <div className="container header_wrap">
                <div className="logo">
                    <img src={logo__basket} alt="" />
                    <p>MarketFinder</p>
                </div>
                <div className="buttons">
                    <div className="info">
                        <img src={info} alt="" onClick={() => handleConditionState(condition)}/>
                    </div>
                    <div className="autorization">
                        <div className="sign_in">
                            <p>Войти</p>
                        </div>
                        <div className="sign_up">
                            <p>Регистрация</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal 
                condition={condition} 
                setCondition={() => handleConditionState(condition)}
            >
                <div className="howItWorks">
                    <div className="howItWorks__wrap">
                        <div className="howItWorks__text">
                            <h1>Как это работает?</h1>
                            <p>Ты просто вводишь название товара или вставляешь ссылку на него. А мы показываем лучшие варианты на разных маркетплейсах</p>   
                        </div>

                    </div>
                    <button>Подробнее</button>
                </div>
            </Modal>
        </header>
    )
}

