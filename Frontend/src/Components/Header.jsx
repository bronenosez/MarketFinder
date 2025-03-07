import "../styles/Header.css";
import '../styles/index.css';
import logo__basket from "../img/logo__basket-svg.svg";
import info from "../img/info.svg";

export default function Header () {
    return (
        <header>
            <div className="container header_wrap">
                <div className="logo">
                    <img src={logo__basket} alt="" />
                    <p>MarketFinder</p>
                </div>
                <div className="buttons">
                    <div className="info">
                        <img src={info} alt="" />
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
            
        </header>
    )
}