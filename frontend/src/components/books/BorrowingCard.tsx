import React from 'react';
import type { BorrowingRecord } from '@/types/BorrowingRecord';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface BorrowingCardProps {
    record: BorrowingRecord;
    onReturn: (record: BorrowingRecord) => void;
}

const BorrowingCard: React.FC<BorrowingCardProps> = ({ record, onReturn }) => {
    const { book } = record;
    const isOverdue = record.status === 'OVERDUE' || (new Date() > new Date(record.dueDate) && record.status === 'BORROWED');
    const isReturned = record.status === 'RETURNED';

    const getDaysRemaining = () => {
        if (isReturned) return 0;
        const diff = new Date(record.dueDate).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 3600 * 24));
    };

    const daysRemaining = getDaysRemaining();

    const getStatusBadge = () => {
        if (isReturned) return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200"><CheckCircle className="w-3 h-3 mr-1" /> Returned</Badge>;
        if (isOverdue) return <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</Badge>;
        return <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50"><Clock className="w-3 h-3 mr-1" /> {daysRemaining} days left</Badge>;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <Card className={`h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 ${isOverdue ? 'ring-1 ring-red-100' : ''}`}>
                <div className="flex h-full flex-col sm:flex-row">
                    {/* Book Cover / Left Side */}
                    <div className="sm:w-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden shrink-0 min-h-[160px] sm:min-h-full group">
                        {book.coverImageUrl ? (
                            <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 hover:scale-110" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                                <span className="text-4xl mb-2 filter grayscale opacity-20">📚</span>
                            </div>
                        )}
                        <div className="absolute top-2 left-2 sm:hidden">
                            {getStatusBadge()}
                        </div>
                    </div>

                    {/* Content / Right Side */}
                    <div className="flex-1 flex flex-col p-4 sm:p-5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1 text-lg mb-1">{book.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{book.author}</p>
                            </div>
                            <div className="hidden sm:block">
                                {getStatusBadge()}
                            </div>
                        </div>

                        <div className="flex-grow space-y-3 mt-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <p className="text-xs text-slate-500 mb-0.5">Borrowed</p>
                                    <div className="font-medium text-slate-700 dark:text-slate-300 flex items-center">
                                        <Calendar className="w-3 h-3 mr-1.5 text-slate-400" />
                                        {new Date(record.borrowDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className={`bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800 ${isOverdue ? 'bg-red-50/50 border-red-50' : ''}`}>
                                    <p className={`text-xs mb-0.5 ${isOverdue ? 'text-red-500' : 'text-slate-500'}`}>{isReturned ? 'Returned' : 'Due Date'}</p>
                                    <div className={`font-medium flex items-center ${isOverdue ? 'text-red-600' : 'text-slate-700 dark:text-slate-300'}`}>
                                        <Calendar className={`w-3 h-3 mr-1.5 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`} />
                                        {new Date(isReturned ? record.returnDate! : record.dueDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Only render if lateFee is strictly positive to avoid rendering '0' */}
                            {record.lateFee !== undefined && record.lateFee > 0 && (
                                <div className="flex items-center justify-between text-sm bg-red-50 text-red-700 px-3 py-2 rounded-md border border-red-100">
                                    <span className="flex items-center"><AlertCircle className="w-3 h-3 mr-2" /> Late Fee</span>
                                    <span className="font-bold">${record.lateFee.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <CardFooter className="p-0 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            {!isReturned ? (
                                <Button
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 shadow-sm"
                                    onClick={() => onReturn(record)}
                                >
                                    Return Book
                                </Button>
                            ) : (
                                <div className="w-full text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Completed
                                </div>
                            )}
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default BorrowingCard;
