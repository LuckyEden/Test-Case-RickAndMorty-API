import { useEffect, useState } from "react";
import {
    FaArrowUp
} from "react-icons/fa";

const ToUp = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={`to-up ${visible ? 'to-up--visible' : ''}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </div>
    );
}


export default ToUp;