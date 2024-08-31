import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
    const location = useLocation();
    useEffect(() => {
        onClose();
    }, [location]);
    return (
        <div>
            <AnimatePresence mode='wait'>
                {open && (
                    <>
                        <motion.div
                            initial={{
                                display: 'none',
                                opacity: 0
                            }}
                            animate={{
                                display: open ? 'block' : 'none',
                                opacity: open ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            exit={{ opacity: 0 }}
                            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[60]`}
                            onClick={onClose}
                        >
                        </motion.div>

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: open ? 0 : '-100%' }}
                            transition={{ duration: 0.3 }}
                            exit={{ x: '-100%' }}
                            className={`fixed top-0 left-0 w-64 h-full bg-white z-[999] ${open ? 'block' : 'hidden'}`}
                        >
                            <div
                                className="flex justify-between p-4"
                            >
                                <p>
                                    The Rick and Morty API
                                </p>
                                <button
                                    onClick={onClose}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div
                                className="flex flex-col items-center"
                            >
                                <ul className='text-center flex-col flex gap-4'>
                                    <li
                                        className={
                                            location.pathname === "/characters"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Link to="/characters">
                                            Characters
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            location.pathname === "/episodes"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Link to="/episodes">

                                            Episodes
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            location.pathname === "/locations"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Link to="/locations">
                                            Locations
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MobileDrawer;