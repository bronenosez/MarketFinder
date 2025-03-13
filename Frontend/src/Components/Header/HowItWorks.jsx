import Modal from "../Modal"

export default function HowItWorks ({condition, setCondition}) {
    return (
        <Modal 
                condition={condition} 
                setCondition={setCondition}
            >
                <div className="howItWorks">
                    <div className="howItWorks__wrap">
                        <div className="howItWorks__text">
                            <h1>Как это работает?</h1>
                            <p>Ты просто вводишь название товара или вставляешь ссылку на него. А мы показываем лучшие варианты на разных маркетплейсах</p>   
                        </div>

                    </div>
                    <button>Подробнее</button>
                </div>
            </Modal>
    )
}