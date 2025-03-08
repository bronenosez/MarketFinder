import '../styles/Modal.css'


export default function Modal({condition, setCondition, children}) {

  return (
    <div className={condition ? 'modal_wrap active' : 'modal_wrap'} onClick={() => setCondition()}>
      <div className={condition ? 'wrap active' : 'wrap'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
   
  );
}