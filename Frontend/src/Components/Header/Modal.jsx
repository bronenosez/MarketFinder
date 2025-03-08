import cross from '../../img/cross.svg';
import '../../styles/Modal.css'


export default function Modal({condition, setCondition, children}) {
  
  return (
    <div className={condition ? 'wrap active' : 'wrap'}>
      {children}
    </div>
  );
}