import Modal from "../Modal";


export default function RegistrationFormModal({ condition, setCondition }) {
  return (
    <Modal condition={condition} setCondition={setCondition}>
      <div className="registration">
        <h1>Регистрация</h1>
        <button onClick={() => setCondition(false)}>Закрыть</button>
      </div>
    </Modal>
  );
}