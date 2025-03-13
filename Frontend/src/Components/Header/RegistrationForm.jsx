import { useState} from "react";
import Modal from "../Modal";
import '../../styles/Forms.css'
import eye_png from '../../img/eye.png';
import eye_close_png from '../../img/eye_close.png';
import info_svg from '../../img/info.svg'

export default function RegistrationFormModal({ condition, setCondition }) {
  
  const [eyeCondition, setEyeCondition] = useState(false);
  const [eyeCondition_2, setEyeCondition_2] = useState(false)

  /* validation */
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

  function handleInputChecked(e) {
    const {name} = e.target;

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
        console.log("handleInput, something wrong");
    }
  }

  const handleEmail = (e) => {
    setEmailValue(e.target.value)

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (String(e.target.value).trim() === "") {
      setEmailError('Пустое поле')
    }
    else if (!re.test(String(e.target.value))) {
      setEmailError("Некорректная почта");
    }
    else {
      setEmailError('')
    }    
  }

  const handleName = (e) => { 
    const acceptValues = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz_1234567890";
    
    setNameValue(e.target.value);
    if (String(e.target.value).trim() === "") {
      setNameError('Пустое поле');
    }
    else if (!(e.target.value.split('').every((x) => acceptValues.includes(x)))) {
      setNameError('Некорректное имя');
    }
    else {
      setNameError('');
    }
  }

  const handlePassword = (e) => {
    const acceptValues = /^(?=(?:[^a-zа-яё]*[a-zа-яё]){2})(?=(?:[^A-ZА-ЯЁ]*[A-ZА-ЯЁ]){2})(?=(?:[^0-9]*[0-9]){2})(?=.*[!-/:-@[-`{-~]).{8,}$/;


    setPasswordValue(e.target.value);
    if (String(e.target.value).trim() === "") {
      setPasswordError('Пустое поле');
    }
    else if (!(acceptValues.test(String(e.target.value)))) {
      setPasswordError('Некорректный пароль');
    }
    else {
      setPasswordError('');
    }
  }

  const handleRepeatPassword = (e) => {
    setRepeatPasswordValue(e.target.value);

    if (String(e.target.value).trim() === "") {
      setRepeatPasswordError('Пустое поле');
    }
    else if (e.target.value !== passwordValue) {
      setRepeatPasswordError('Пароли не совпадают');
    }
    else {
      setRepeatPasswordError('');
    }
    
  }

  /*end validation */

  function handleEyeCondition () {
    setEyeCondition(c => !c)
  }
  function handleEyeCondition_2 () {
    setEyeCondition_2(c => !c)
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
                  id="userNameInput" 
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
                  id="emailInput" 
                  value={emailValue}
                  onBlur={e => handleInputChecked(e)}
                  onChange={handleEmail}
                />
                
            </div>
            <div className="inputBlock">
              <div className="inputBlock__header">

                <div className="tooltip">
                  <img src={info_svg} alt="" width={25} height={25}/>
                  <span class="tooltip-text">
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
                id="passwordInput"
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
                  id="repeatPasswordInput"
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
        >
          Зарегистрироваться
        </button>
      </div>
    </Modal>
  );
}
