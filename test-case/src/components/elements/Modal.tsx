import React, { useEffect } from "react";
import { TCTypes } from "../../types";
import {
    FaTimes
} from 'react-icons/fa';

const Modal: React.FC<TCTypes.ModalProps> = ({ children, open, onClose }) => {

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        console.log("Modal opened: ", open);

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <div
            className={
                `fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-75 ${open ? "block" : "hidden"}`
            }
            onClick={onClose}
        >

            <div
                className={
                    "w-11/12 md:w-1/2 bg-paper shadow-xl rounded-lg p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                }
                onClick={e => e.stopPropagation()}
            >
                <button 
                data-tooltip-id="tooltip-globe"
                data-tooltip-content={"Close"}
                className="z-50 text-white text-lg bg-secondary-main rounded-full p-2 shadow  absolute -top-4 -right-4 hover:brightness-75 transition-all cursor-pointer outline-none border-none" onClick={onClose}>
                    <FaTimes  />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;