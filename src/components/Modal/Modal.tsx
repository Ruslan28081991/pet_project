import React, { useState } from "react";
import { createPortal } from "react-dom";

import './Modal.css'

interface IModal {
    initialText: string;
    onSave: (newText: string) => void;
    onCancel: () => void;
  }

export default function Modal(props: IModal) {
    const { initialText, onSave, onCancel } = props;

    const modalElement = document.getElementById('modal')!;
    const [text, setText] = useState(initialText)

    return createPortal(
        <div className="modal">
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
        </div>, 
        modalElement
    )
}