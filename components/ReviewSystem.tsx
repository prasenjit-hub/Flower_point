
import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, X, Send, User } from 'lucide-react';
import { Review } from '../types';

interface ReviewSystemProps {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, productName, isOpen, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const savedReviews = localStorage.getItem(`reviews_${productId}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen, productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const review: Review = {
      id: Date.now().toString(),
      productId,
      userName: newName,
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
    
    setNewName('');
    setNewComment('');
    setNewRating(5);
  };

  if (!isOpen) return null;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 'New';

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-premium-cream/50">
          <div className="pr-4">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 font-serif leading-tight truncate">{productName}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex text-rose-pink">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(Number(averageRating)) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-500">{averageRating} ({reviews.length})</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
          {/* Add Review Form */}
          <section className="bg-slate-50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl">
            <h3 className="text-sm font-bold mb-4 flex items-center space-x-2 text-slate-700">
              <MessageSquare size={16} className="text-rose-pink" />
              <span>Leave a Review</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border-none focus:ring-2 focus:ring-rose-pink outline-none shadow-sm text-sm"
                />
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl sm:rounded-2xl shadow-sm">
                  <span className="text-xs text-slate-400 font-medium">Rating:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-rose-pink"
                      >
                        <Star 
                          size={18} 
                          fill={(hoverRating || newRating) >= star ? "currentColor" : "none"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea 
                placeholder="Your experience..."
                required
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl sm:rounded-2xl border-none focus:ring-2 focus:ring-rose-pink outline-none shadow-sm resize-none text-sm"
              ></textarea>
              <button 
                type="submit"
                className="w-full bg-rose-pink text-white font-bold py-4 rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center space-x-2 active:scale-95 transition-transform"
              >
                <Send size={16} />
                <span>Submit</span>
              </button>
            </form>
          </section>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-slate-50 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-rose-pink/10 rounded-full flex items-center justify-center text-rose-pink font-bold text-sm">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{review.userName}</h4>
                        <div className="flex text-rose-pink">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">{review.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-12">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 opacity-40">
                <User size={32} className="mx-auto mb-2" />
                <p className="text-sm">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSystem;
