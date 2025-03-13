import {useState, useEffect} from "react";
import Modal from "../Modal";
import '../../styles/Forms.css'
import eye_png from '../../img/eye.png';
import eye_close_png from '../../img/eye_close.png';
import info_svg from '../../img/info.svg'

import { validateEmail, validateName, validatePassword, validateRepeatPassword } from "../../Scripts/validate.js"

export default function RegistrationFormModal({ condition, setCondition }) {
  
  const [eyeCondition, setEyeCondition] = useState(false);
  const [eyeCondition_2, setEyeCondition_2] = useState(false);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  const [nameChecked, setNameChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [repeatPasswordChecked, setRepeatPasswordChecked] = useState(false);

  const [nameError, setNameError] = useState('Пустое поле');
  const [emailError, setEmailError] = useState('Пустое поле');
  const [passwordError, setPasswordError] = useState('Пустое поле');
  const [repeatpasswordError, setRepeatPasswordError] = useState('Пустое поле');

  /* Clear vars if form is closed */
  useEffect(() => {
    if (!condition) {
      setNameValue('');
      setEmailValue('');
      setPasswordValue('');
      setRepeatPasswordValue('');
      
      setNameChecked(false);
      setEmailChecked(false);
      setPasswordChecked(false);
      setRepeatPasswordChecked(false);

      setNameError('Пустое поле');
      setEmailError('Пустое поле');
      setPasswordError('Пустое поле');
      setRepeatPasswordError('Пустое поле');
    }
  }, [condition]);


  function handleInputChecked(e) {
    const { name } = e.target;

    switch (name) {
      case 'userName':
        setNameChecked(true);
        break;
      case 'email':
        setEmailChecked(true);
        break;
      case 'password':
        setPasswordChecked(true);
        break;
      case 'repeatPassword':
        setRepeatPasswordChecked(true);
        break;
      default:
        console.log("handleInputChecked: неизвестное поле");
    }
  }

  const handleEmail = (e) => {
    setEmailValue(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handleName = (e) => {
    setNameValue(e.target.value);
    setNameError(validateName(e.target.value));

  };

  const handlePassword = (e) => {
    setPasswordValue(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleRepeatPassword = (e) => {
    setRepeatPasswordValue(e.target.value);
    setRepeatPasswordError(validateRepeatPassword(passwordValue, e.target.value));
  };

  function handleEyeCondition () {
    setEyeCondition(c => !c);
  }

  function handleEyeCondition_2 () {
    setEyeCondition_2(c => !c);
  }
 
  function handleBackendRequest() {
    if ([nameError, emailError, passwordError, repeatpasswordError].every(x => x === false)) {
      console.log('accepted'.toUpperCase());
      console.log([nameError, emailError, passwordError, repeatpasswordError])
    }
    else {
      console.log("don't accepted".toUpperCase());
      console.log([nameError, emailError, passwordError, repeatpasswordError])
    }
  }

  return (
    <Modal condition={condition} setCondition={setCondition}>
      <div className="registration">
        <div className="registration__text">
            <h1>Регистрация</h1>

            <div className="inputBlock">
                <div className="inputBlock__header">
                  <label htmlFor="userName">Имя</label>
                  {(nameChecked && nameError) && 
                    <p className="error__p">{nameError}</p>
                  }
                </div>
                <input 
                  type="text" 
                  name="userName" 
                  id="registration_userNameInput" 
                  value={nameValue}
                  onChange={handleName}
                  onBlur={handleInputChecked}
                />
            </div>
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
                  id="registration_emailInput" 
                  value={emailValue}
                  onBlur={e => handleInputChecked(e)}
                  onChange={handleEmail}
                />
                
            </div>
            <div className="inputBlock">
              <div className="inputBlock__header">

                <div className="tooltip">
                  <img src={info_svg} alt="" width={25} height={25}/>
                  <span className="tooltip-text">
                    Пароль должен содержать:<br/>
                    • Минимум 8 символов<br/>
                    • 2 строчные буквы (a-z)<br/>
                    • 2 заглавные буквы (A-Z)<br/>
                    • 2 цифры (0-9)<br/>
                    • 1 специальный символ<br/>
                    (Не содержать пробелы)
                  </span>
                </div>

                <label htmlFor="password">Пароль</label>
                {(passwordChecked && passwordChecked) && 
                  <p className="error__p">{passwordError}</p>
                }
              </div>
              
              <div className="inputWrap">
                
                <input 
                type={eyeCondition ? "text" : "password"}
                name="password" 
                id="registration_passwordInput"
                value={passwordValue} 
                onBlur={e => handleInputChecked(e)}
                onChange={handlePassword}
                />
                <img className="eye_svg" onClick={() => handleEyeCondition()}  src={eyeCondition ? eye_close_png : eye_png} width={25} height={25} alt="" />
                
              </div>          
            </div>
            <div className="inputBlock">
              <div className="inputBlock__header">
                <label htmlFor="RepeatPassword">Повторите пароль</label>
                
                {(repeatPasswordChecked && repeatpasswordError) && 
                  <p className="error__p">{repeatpasswordError}</p>
                }
              </div>
              
              <div className="inputWrap">
                <input 
                  type={eyeCondition_2 ? "text" : "password"} 
                  name="repeatPassword" 
                  id="registration_repeatPasswordInput"
                  value={repeatPasswordValue} 
                  onBlur={e => handleInputChecked(e)}
                  onChange={handleRepeatPassword}
                /> 
                <img className="eye_svg" onClick={() => handleEyeCondition_2()} src={eyeCondition_2 ? eye_close_png : eye_png} width={25} height={25} alt="" />
                
              </div>
            </div>     
            
        </div>
        <button 
          className="registration-button"
          id="registration-button"
          onClick={handleBackendRequest}
        >
          Зарегистрироваться
        </button>
      </div>
    </Modal>
  );
}
