import '../styles/Modal.css'


export default function Modal({condition, setCondition, children}) {
  document.body.addEventListener('click', () => setCondition(false))
  return (
    <div className={condition ? 'wrap active' : 'wrap'} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
}