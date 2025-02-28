import React, { useState } from "react";
import { createPortal } from "react-dom";
import { TModal } from "../CharacterConstants/CharacterConstants";
import './Modal.css'

const modalElement = document.getElementById('modal')!;

function Modal({ initialText, onSave, onCancel }: TModal) {
    const [text, setText] = useState(initialText)
    return createPortal(
        (<div className="modal">
            <div className="modal-content">
            <h1>Enter new value</h1>
            <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
            <button onClick={() => onSave(text)}>Save</button>
            <button onClick={() => onCancel()}>Cancel</button>
            </div>
            
        </div>), 
        modalElement
    )
}


export default Modal;