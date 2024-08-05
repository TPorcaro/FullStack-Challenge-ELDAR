import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const customStyles = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
        padding: 0,
        border: 'none',
        background: 'transparent',
        width: '100%',
        maxWidth: '600px',
        inset: 'auto',
    },
};

const CustomModal = ({ isVisible, title, content, onClose, onConfirm }) => {
    const [isOpen, setIsOpen] = useState(isVisible);

    useEffect(() => {
        setIsOpen(isVisible);
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    style={customStyles}
                    contentLabel={title}
                    closeTimeoutMS={300}
                >
                    <motion.div
                        className="relative p-6 bg-white rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold mb-4">{title}</h2>
                        <div className="mb-4">{content}</div>
                        <div className="flex justify-between">
                            <Button onClick={onClose} variant="danger">
                                Cancel
                            </Button>
                            <Button onClick={onConfirm} variant="primary">
                                Confirm
                            </Button>
                        </div>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default CustomModal;
