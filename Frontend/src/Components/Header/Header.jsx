import {useState} from 'react';
import "../../styles/Header.css";
import '../../styles/index.css';
import logo__basket from "../../img/logo__basket-svg.svg";
import info from "../../img/info.svg";

import RegistrationForm from "./RegistrationForm";
import HowItWorks from "./HowItWorks";
import LoginFormModal from './LoginForm';

export default function Header () {

    const [infoCondition, setInfoCondition] = useState(false);
    const [registrationCondition, setRegistrationCondition] = useState(false);
    const [loginCondition, setLoginCondition] = useState(false);

    function handleInfoCondition () {
        setInfoCondition((c) => (!c))
    }
    function handleRegistrationCondition () {
        setRegistrationCondition((c) => (!c));
    }
    function handleLoginCondition () {
        setLoginCondition((c) => (!c));
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
                        <img src={info} alt="" onClick={() => handleInfoCondition()}/>
                    </div>
                    <div className="autorization">
                        <div 
                          className="sign_in"
                          onClick={() => handleLoginCondition()} 
                        >
                            <p>Войти</p>
                        </div>
                        <div 
                          className="sign_up"
                          onClick={() => handleRegistrationCondition()}
                        >
                            
                            <p>Регистрация</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <HowItWorks 
                condition={infoCondition}
                setCondition={() => handleInfoCondition()}
            />
            <RegistrationForm
                condition={registrationCondition}
                setCondition={() => handleRegistrationCondition()}
            />
            <LoginFormModal 
                condition={loginCondition}
                setCondition={() => handleLoginCondition()}
            />
        </header>
    )
}

