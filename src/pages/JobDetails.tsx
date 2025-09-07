import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  User,
  Star,
  ArrowLeft,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Edit,
  Phone,
  Users,
  Eye,
  Briefcase,
  Navigation
} from 'lucide-react';
import { PlaceBidModal } from '@/components/bids/PlaceBidModal';
import { formatBudget, getBudgetLabel } from '@/utils/budgetUtils';
import { PageLoader, EnhancedCardSkeleton } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for user's posted jobs
  const mockUserJobs = [
    {
      id: "job1",
      title: "Kitchen Sink Plumbing Repair",
      description: "Need experienced plumber to fix leaking kitchen sink. The sink has been dripping for several days and needs immediate attention. Looking for someone who can diagnose the issue and provide a permanent solution. Must be licensed and insured. Will provide all necessary access to the kitchen area.",
      category: "Home Services",
      location: "Downtown, City Center",
      budget: { type: 'fixed' as const, min: 75, max: 150 },
      postedBy: "user1",
      postedAt: "2 days ago",
      deadline: "Within 3 days",
      status: "open",
      views: 45,
      bidsCount: 3,
      skills: ["Plumbing", "Home Repair", "Emergency Services", "Licensed Professional"]
    },
    {
      id: "job2",
      title: "Logo Design for Tech Startup",
      description: "Looking for a creative designer to create a modern, memorable logo for our new tech startup. We're in the AI/ML space and want something that reflects innovation and trustworthiness. Need multiple concepts, revisions, and final files in various formats. Brand guidelines would be a plus.",
      category: "Design",
      location: "Remote",
      budget: { type: 'hourly' as const, min: 0, max: 0, rate: 75 },
      postedBy: "user1",
      postedAt: "1 day ago",
      deadline: "1 week",
      status: "open",
      views: 67,
      bidsCount: 2,
      skills: ["Logo Design", "Brand Identity", "Adobe Creative Suite", "Tech Industry Experience"]
    }
  ];

  // Mock bids data for jobs posted by user
  const mockJobBids = {
    "job1": [
      {
        id: "bid1",
        bidderName: "Alex Rodriguez",
        bidderRating: 4.8,
        bidderReviews: 24,
        amount: 450,
        proposal: "I have extensive experience in plumbing repairs and can fix your kitchen sink issue efficiently. I'll provide all necessary parts and ensure the job is done to your satisfaction. I'm licensed, insured, and offer a 1-year warranty on all work.",
        timeframe: "2-3 days",
        bidDate: "2 hours ago",
        status: "pending",
        bidderSkills: ["Plumbing", "Home Repair", "Emergency Services"],
        distanceKm: 2.4,
        bidderLocation: "Midtown District"
      },
      {
        id: "bid2",
        bidderName: "Maria Santos",
        bidderRating: 4.9,
        bidderReviews: 31,
        amount: 380,
        proposal: "Professional plumber with 8+ years experience. I can diagnose and fix your kitchen sink problem quickly. Free estimates and warranty on all work. Available for same-day service if needed.",
        timeframe: "1-2 days",
        bidDate: "4 hours ago",
        status: "pending",
        bidderSkills: ["Plumbing", "Kitchen Repairs", "Leak Detection"],
        distanceKm: 1.8,
        bidderLocation: "Downtown East"
      },
      {
        id: "bid3",
        bidderName: "John Mitchell",
        bidderRating: 4.6,
        bidderReviews: 18,
        amount: 520,
        proposal: "Licensed plumber available for immediate service. I specialize in kitchen repairs and can provide same-day service if needed. All work comes with parts and labor warranty.",
        timeframe: "Same day",
        bidDate: "6 hours ago",
        status: "accepted",
        bidderSkills: ["Licensed Plumber", "Emergency Repair", "Kitchen Specialist"],
        distanceKm: 0.9,
        bidderLocation: "City Center"
      }
    ],
    "job2": [
      {
        id: "bid4",
        bidderName: "Sarah Design Studio",
        bidderRating: 4.9,
        bidderReviews: 45,
        amount: 1200,
        proposal: "We specialize in tech startup branding and have created logos for over 50+ startups. Our package includes logo variations, brand guidelines, and source files. We'll work closely with you to capture your vision.",
        timeframe: "5-7 days",
        bidDate: "1 day ago",
        status: "pending",
        bidderSkills: ["Logo Design", "Brand Identity", "Tech Startups"],
        distanceKm: 5.2,
        bidderLocation: "Creative District"
      },
      {
        id: "bid5",
        bidderName: "Creative Minds Co",
        bidderRating: 4.7,
        bidderReviews: 29,
        amount: 950,
        proposal: "Professional logo design with unlimited revisions. We'll create a modern, memorable logo that represents your tech startup's vision and values. Fast turnaround guaranteed.",
        timeframe: "3-5 days",
        bidDate: "1 day ago",
        status: "pending",
        bidderSkills: ["Graphic Design", "Branding", "Digital Design"],
        distanceKm: 12.7,
        bidderLocation: "Suburban Office Park"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading delay
    const loadJob = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const job = mockUserJobs.find(j => j.id === jobId);
      if (job) {
        setSelectedJob(job);
      } else {
        navigate('/dashboard');
      }
      
      setIsLoading(false);
    };
    
    loadJob();
  }, [jobId, navigate]);

  const handleAcceptBid = (bidId: string) => {
    toast({
      title: "Bid Accepted",
      description: "The bid has been accepted successfully. The worker will be notified.",
    });
  };

  const handleRejectBid = (bidId: string) => {
    toast({
      title: "Bid Rejected",
      description: "The bid has been rejected.",
    });
  };

  const jobBids = mockJobBids[jobId as string] || [];

  if (isLoading) {
    return <PageLoader message="Loading job details..." />;
  }

  if (!selectedJob) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Job not found</h2>
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-8">
        <div className="container-mobile max-w-6xl">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold">
                {selectedJob.title}
              </h1>
              <p className="text-muted-foreground mt-2">
                Posted {selectedJob.postedAt} • {selectedJob.status === 'open' ? 'Active' : 'Completed'}
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Job
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Status and Budget */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Badge 
                      variant={selectedJob.status === 'open' ? 'default' : 'secondary'}
                      className={selectedJob.status === 'open' 
                        ? 'bg-success/20 text-success border border-success/30' 
                        : 'bg-muted/50 text-muted-foreground border border-muted'
                      }
                    >
                      {selectedJob.status === 'open' ? 'Active' : 'Completed'}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {formatBudget(selectedJob.budget)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedJob.location}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedJob.deadline}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Required */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bids Section */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">
                    Bids Received ({jobBids.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {jobBids.map((bid) => (
                      <Card key={bid.id} className="border-l-4 border-l-primary/20">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Bidder Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">{bid.bidderName}</h4>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      <span>{bid.bidderRating}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{bid.bidderReviews} reviews</span>
                                    <span>•</span>
                                    <span>{bid.bidDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                                    <Navigation className="w-4 h-4" />
                                    <span>{bid.distanceKm} km away</span>
                                    <span className="text-muted-foreground">• {bid.bidderLocation}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-bold text-primary">${bid.amount}</p>
                                <p className="text-sm text-muted-foreground">{bid.timeframe}</p>
                              </div>
                            </div>

                            {/* Bid Status */}
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={bid.status === 'accepted' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'}
                                className={
                                  bid.status === 'accepted' 
                                    ? 'bg-success/20 text-success border border-success/30'
                                    : bid.status === 'rejected'
                                    ? 'bg-destructive/20 text-destructive border border-destructive/30'
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }
                              >
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                              </Badge>
                            </div>

                            {/* Proposal */}
                            <div>
                              <h5 className="font-medium mb-2">Proposal</h5>
                              <p className="text-muted-foreground leading-relaxed">{bid.proposal}</p>
                            </div>

                            {/* Skills */}
                            <div>
                              <h5 className="font-medium mb-2">Skills</h5>
                              <div className="flex flex-wrap gap-2">
                                {bid.bidderSkills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            {bid.status === 'pending' && (
                              <div className="flex gap-2 pt-2">
                                <Button 
                                  size="sm" 
                                  className="bg-success hover:bg-success/90"
                                  onClick={() => handleAcceptBid(bid.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Accept Bid
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-destructive/20 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleRejectBid(bid.id)}
                                >
                                  Reject
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Message
                                </Button>
                              </div>
                            )}
                            
                            {bid.status === 'accepted' && (
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Contact Worker
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {jobBids.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h4 className="text-lg font-medium mb-2">No bids received yet</h4>
                        <p>Your job is active and visible to workers. Bids will appear here when received.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Statistics */}
            <div className="space-y-6">
              {/* Job Statistics */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Job Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Total Views</span>
                      </div>
                      <span className="font-bold">{selectedJob.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Total Bids</span>
                      </div>
                      <span className="font-bold">{jobBids.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Average Bid</span>
                      </div>
                      <span className="font-bold">
                        ${jobBids.length ? 
                          Math.round(jobBids.reduce((sum, bid) => sum + bid.amount, 0) / jobBids.length) 
                          : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View All Messages
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Job Details
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
