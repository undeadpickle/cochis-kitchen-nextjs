import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImagePopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    price?: string;
    image: string;
    imageAlt?: string;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
    isOpen,
    onClose,
    title,
    description,
    price,
    image,
    imageAlt = 'Product image'
}) => {
    if (!isOpen) return null;

    // Close when clicking outside of the content area
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 sm:p-6 md:p-10"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-xl shadow-2xl"
                        style={{
                            maxHeight: 'calc(100vh - 40px)'
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                            aria-label="Close dialog"
                        >
                            <X size={20} />
                        </button>

                        {/* Image with overlay styling like in About page */}
                        <div className="w-full h-full relative">
                            <img
                                src={image}
                                alt={imageAlt}
                                className="w-full object-cover"
                                style={{ maxHeight: 'calc(100vh - 120px)' }}
                            />

                            {/* Gradient overlay like in About page */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cochi-red/20 to-cochi-gold/10"></div>

                            {/* Image caption overlay */}
                            <div className="image-caption-overlay absolute bottom-0 left-0 right-0 pb-6 px-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <p className="font-display text-2xl mb-1.5">{title}</p>
                                <p className="text-base -mt-0">{description}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImagePopup; 