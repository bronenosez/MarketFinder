export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (email.trim() === "") return 'Пустое поле';
    if (!re.test(email)) return 'Некорректная почта';

    if (!(email.trim() === "") && re.test(email)) return false;
     
    return '';
  };
  
  export const validateName = (name) => {
    const acceptValues = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz_1234567890";
    
    if (name.trim() === "") return 'Пустое поле';
    if (name.trim().length < 5) return 'Слишком короткое имя'
    if (!String(name).toLowerCase().split('').every((x) => acceptValues.includes(x))) return 'Некорректное имя';
    
    if (!(name.trim() === "") && String(name).toLowerCase().split('').every((x) => acceptValues.includes(x))) return false;
    
    return '';
  };
  
  export const validatePassword = (password) => {
    const acceptValues = /^(?=(?:[^a-zа-яё]*[a-zа-яё]){2})(?=(?:[^A-ZА-ЯЁ]*[A-ZА-ЯЁ]){2})(?=(?:[^0-9]*[0-9]){2})(?=.*[!-/:-@[-`{-~]).{8,}$/;
    
    if (password.trim() === "") return 'Пустое поле';
    if (!acceptValues.test(password)) return 'Некорректный пароль';

    if (!(password.trim() === "") && acceptValues.test(password)) return false;
    
    return '';
  };
  
  export const validateRepeatPassword = (password, repeatPassword) => {
    if (repeatPassword.trim() === "") return 'Пустое поле';
    if (repeatPassword !== password) return 'Пароли не совпадают';
    
    if (!(repeatPassword.trim() === "") && repeatPassword === password) return false;

    return '';
  };