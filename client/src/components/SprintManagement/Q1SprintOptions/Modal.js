import React from "react";
import './Modal.css'

function Modal({ title, children, onCancel, onConfirm}) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-actions">
                    <button onClick={onCancel} id="btn-cancel">Cancel</button>
                    <button onClick={onConfirm} id="btn-confirm">Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Modal