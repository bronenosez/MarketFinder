import {useState} from 'react';

import Modal from "./Modal";

export default function Form () {
    const [condition, setCondition] = useState(false);

    function handleCondition () {
        setCondition((c) => (!c))
    }
    return (
        <Modal 
            condition={condition} 
            setCondition={handleCondition}
        >
            
        </Modal>
    )
}