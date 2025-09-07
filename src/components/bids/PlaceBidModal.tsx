import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, DollarSign, MapPin, Clock, User } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { placeBid } from '../../store/slices/bidsSlice';
import { PageLoader } from '@/components/ui/loading-spinner';
import { addNotification } from '../../store/slices/notificationsSlice';
import { Job } from '../../store/slices/jobsSlice';
import { toast } from '@/hooks/use-toast';

interface PlaceBidModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceBidModal = ({ job, isOpen, onClose }: PlaceBidModalProps) => {
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const amount = parseFloat(bidAmount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Invalid bid amount",
          description: "Please enter a valid bid amount.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (amount < job.budget.min || amount > job.budget.max) {
        toast({
          title: "Bid out of range",
          description: `Bid must be between $${job.budget.min} and $${job.budget.max}.`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      await dispatch(placeBid({
        jobId: job.id,
        amount,
        message,
      }));
      
      // Create notification for job poster (mock)
      dispatch(addNotification({
        type: 'bid_received',
        title: 'New Bid Received',
        message: `Someone placed a bid of $${amount} on your ${job.title} job`,
        read: false,
        jobId: job.id,
      }));

      toast({
        title: "Bid placed successfully!",
        description: "Your bid has been submitted. You'll be notified when the client responds.",
      });

      setBidAmount('');
      setMessage('');
      onClose();
    } catch (error: any) {
      toast({
        title: "Failed to place bid",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Place Your Bid</DialogTitle>
          <DialogDescription>
            Submit your proposal for this job. Make sure to read the requirements carefully.
          </DialogDescription>
        </DialogHeader>

        {/* Job Summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                {job.urgent && (
                  <Badge variant="destructive" className="ml-2">
                    Urgent
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground">{job.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${job.budget.min} - ${job.budget.max}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.postedAt}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bid Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bidAmount">Your Bid Amount ($)</Label>
            <Input
              id="bidAmount"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Between $${job.budget.min} - $${job.budget.max}`}
              min={job.budget.min}
              max={job.budget.max}
              step="0.01"
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Budget range: ${job.budget.min} - ${job.budget.max}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Proposal Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your experience, approach, and why you're the best fit for this job..."
              rows={6}
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Provide details about your experience and how you plan to complete this job.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Placing Bid...
                </>
              ) : (
                'Place Bid'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};