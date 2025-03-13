import {useEffect, useState} from "react";
import Modal from "../Modal";
import '../../styles/Forms.css'
import eye_png from '../../img/eye.png';
import eye_close_png from '../../img/eye_close.png';

import { validateEmail, validatePassword} from "../../Scripts/validate.js"

export default function LoginFormModal({ condition, setCondition }) {
  
  const [eyeCondition, setEyeCondition] = useState(false);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [emailChecked, setEmailChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);

  const [emailError, setEmailError] = useState('Пустое поле');
  const [passwordError, setPasswordError] = useState('Пустое поле');

  /* Clear vars if form is closed */
  useEffect(() => {
    if (!condition) {
      setEmailValue('');
      setPasswordValue('');
      
      setEmailChecked(false);
      setPasswordChecked(false);

      setEmailError('Пустое поле');
      setPasswordError('Пустое поле');
    }
  }, [condition]);

  function handleInputChecked(e) {
    const { name } = e.target;

    switch (name) {
      case 'email':
        setEmailChecked(true);
        break;
      case 'password':
        setPasswordChecked(true);
        break;
  
      default:
        console.log("handleInputChecked: неизвестное поле");
    }
  }

  const handleEmail = (e) => {
    setEmailValue(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePassword = (e) => {
    setPasswordValue(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  function handleEyeCondition () {
    setEyeCondition(c => !c);
  }
  function handleBackendRequest() {
    if ([emailError, passwordError].every(x => x === false)) {
      console.log('accepted'.toUpperCase());
      console.log([emailError, passwordError])
    }
    else {
      console.log("don't accepted".toUpperCase());
      console.log([emailError, passwordError])
    }
  }

  return (
    <Modal condition={condition} setCondition={setCondition}>
      <div className="login">
        <div className="login__text">
            <h1>Вход</h1>

            <div className="inputBlock">
                <div className="inputBlock__header">
                  <label htmlFor="email">Почта</label>
                  {(emailChecked && emailError) && 
                    <p className="error__p">{emailError}</p>
                  }
                </div>
                
                <input 
                  type="text" 
                  name="email" 
                  id="login_emailInput" 
                  value={emailValue}
                  onBlur={e => handleInputChecked(e)}
                  onChange={handleEmail}
                />
                
            </div>
            <div className="inputBlock">
              <div className="inputBlock__header">
                <label htmlFor="password">Пароль</label>
                {(passwordChecked && passwordChecked) && 
                  <p className="error__p">{passwordError}</p>
                }
              </div>
              
              <div className="inputWrap">
                
                <input 
                type={eyeCondition ? "text" : "password"}
                name="password" 
                id="login_passwordInput"
                value={passwordValue} 
                onBlur={e => handleInputChecked(e)}
                onChange={handlePassword}
                />
                <img className="eye_svg" onClick={() => handleEyeCondition()}  src={eyeCondition ? eye_close_png : eye_png} width={25} height={25} alt="" />
                
              </div>          
            </div>
               

        </div>
        <button 
          className="login-button"
          id="login-button"
          onClick={handleBackendRequest}
        >
          Войти
        </button>
      </div>
    </Modal>
  );
}
