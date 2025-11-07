import { useEffect, useState } from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import { useAppContext } from '@/context/AppContext';
import { fetchFeedback } from '@/utils/fakeAPI';
import { Star } from 'lucide-react';

const Feedback = () => {
  const { feedback, setFeedback } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const feedbackData = await fetchFeedback();
      setFeedback(feedbackData as any);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmitFeedback = (newFeedback: { rating: number; comment: string }) => {
    setFeedback([
      ...feedback,
      {
        id: Date.now().toString(),
        patientName: 'Current User',
        ...newFeedback,
        date: new Date().toISOString().split('T')[0],
      },
    ]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="animate-pulse">
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  const avgRating = feedback.length > 0 
    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Patient Feedback</h1>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-6 h-6 fill-warning text-warning" />
            <span className="text-3xl font-bold text-foreground">{avgRating}</span>
            <span className="text-muted-foreground">/ 5.0</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Based on {feedback.length} reviews</p>
        </div>

        <FeedbackForm onSubmit={handleSubmitFeedback} />

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Recent Feedback</h2>
          {feedback.slice().reverse().map(item => (
            <div key={item.id} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating ? 'fill-warning text-warning' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-foreground">{item.comment}</p>
              <p className="text-sm text-muted-foreground mt-2">- {item.patientName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
