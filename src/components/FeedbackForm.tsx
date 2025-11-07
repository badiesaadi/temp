import { useState } from 'react';
import { Star } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (feedback: { rating: number; comment: string }) => void;
}

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Share Your Feedback</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">Rate Your Experience</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hoverRating || rating)
                    ? 'fill-warning text-warning'
                    : 'text-muted'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Comments</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Tell us about your experience..."
          className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:outline-none resize-none"
        />
      </div>
      
      <button
        type="submit"
        disabled={rating === 0}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
