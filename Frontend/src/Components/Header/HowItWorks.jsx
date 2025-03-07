import { Transition } from 'react-transition-group';
import { useRef } from 'react';
import cross from '../../img/cross.svg';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export default function HowItWorks({ condition = false, crossFunc = 0}) {
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={condition} timeout={duration}>
      {state => (
        <div ref={nodeRef} style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
            <div className="howItWorks">
                <img onClick={crossFunc} className='howItWorks__cross' src={cross} alt="" />
                <div className="howItWorks__text">
                    <h1>Как это работает?</h1>
                    <p>Ты просто вводишь название товара или вставляешь ссылку на него. А мы показываем лучшие варианты на разных маркетплейсах</p>   
                </div>
                <button>Подробнее</button>
            </div>

        </div>
      )}
    </Transition>
  );
}