import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface BorrowButtonProps {
    isBorrowed: boolean;
    availableCopies: number;
    onClick: () => void;
    isLoading?: boolean;
}

const BorrowButton: React.FC<BorrowButtonProps> = ({ isBorrowed, availableCopies, onClick, isLoading }) => {
    return (
        <motion.div whileTap={{ scale: 0.95 }}>
            <Button
                variant={isBorrowed ? "secondary" : "default"}
                size="sm"
                className={`w-full transition-all duration-300 ${isBorrowed
                        ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                disabled={isLoading || (!isBorrowed && availableCopies <= 0)}
            >
                {isLoading ? (
                    <span className="animate-pulse">Processing...</span>
                ) : isBorrowed ? (
                    <>
                        <LogOut className="mr-2 h-4 w-4" /> Return Book
                    </>
                ) : availableCopies > 0 ? (
                    <>
                        <BookOpen className="mr-2 h-4 w-4" /> Borrow
                    </>
                ) : (
                    <span className="text-slate-500">Out of Stock</span>
                )}
            </Button>
        </motion.div>
    );
};

export default BorrowButton;
