import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    // Close modal on ESC key press
    useEffect(() => {
        const closeOnEsc = (e) => {
            if (e.key === 'Escape') {
                onClose?.(); // Call the onClose prop function
            }
        };

        document.addEventListener('keydown', closeOnEsc);
        return () => document.removeEventListener('keydown', closeOnEsc);
    }, [onClose]);

    return (
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle" id="my_modal_5">
            <div className="modal-box">
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button type="button" className="btn" onClick={onClose}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
