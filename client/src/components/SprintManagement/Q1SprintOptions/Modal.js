import React from "react";
import './Modal.css'

function Modal({ title, children, onCancel, onConfirm}) {
    return (
        <div id="modal-backdrop">
            <div id="modal-content">
                <h2>{title}</h2>
                <div id="modal-body">
                    {children}
                </div>
                <div id="modal-actions">
                    <button onClick={onCancel} id="btn-cancel">Cancel</button>
                    <button onClick={onConfirm} id="btn-confirm">Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Modal