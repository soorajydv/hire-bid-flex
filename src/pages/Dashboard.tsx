import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  PlusCircle, 
  MapPin, 
  DollarSign, 
  Clock, 
  Star,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Eye,
  Briefcase, 
  Phone,
  Edit,
  ArrowLeft,
  User,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PlaceBidModal } from '@/components/bids/PlaceBidModal';
import { LoadingSpinner, StatsSkeleton, EnhancedCardSkeleton, PageLoader } from '@/components/ui/loading-spinner';
import { formatBudget, getBudgetLabel } from '@/utils/budgetUtils';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchMyJobs } from '../store/slices/jobsSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { jobs, loading: jobsLoading } = useAppSelector((state) => state.jobs);
  const { bids, loading: bidsLoading } = useAppSelector((state) => state.bids);
  const [statsLoading, setStatsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyJobs());
    }
    
    const timer = setTimeout(() => {
      setStatsLoading(false);
      setPageLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [dispatch, isAuthenticated]);

  if (pageLoading) {
    return <PageLoader message="Loading dashboard..." />;
  }

  // Mock data for stats
  const dashboardStats = {
    jobsPosted: 12,
    activeBids: 8,
    completedJobs: 25,
    totalEarned: 2450
  };

  // Mock data for user's posted jobs
  const mockUserJobs = [
    {
      id: "job1",
      title: "Kitchen Sink Plumbing Repair",
      description: "Need experienced plumber to fix leaking kitchen sink.",
      category: "Home Services",
      location: "Downtown, City Center",
      budget: { type: 'fixed' as const, min: 75, max: 150 },
      postedBy: "user1",
      postedAt: "2 days ago",
      deadline: "Within 3 days",
      status: "open",
      views: 45,
      bidsCount: 3,
      skills: ["Plumbing", "Home Repair"]
    },
    {
      id: "job2",
      title: "Logo Design for Tech Startup",
      description: "Looking for a creative designer to create a modern logo.",
      category: "Design",
      location: "Remote",
      budget: { type: 'hourly' as const, min: 0, max: 0, rate: 85 },
      postedBy: "user1",
      postedAt: "1 day ago",
      deadline: "1 week",
      status: "open",
      views: 67,
      bidsCount: 2,
      skills: ["Logo Design", "Brand Identity"]
    }
  ];

  // Mock data for user's bids
  const mockUserBids = [
    {
      id: "bid1",
      jobId: "job101",
      jobTitle: "Website Development",
      bidderId: "user1",
      bidderName: "Sarah Johnson",
      amount: 1200,
      message: "I can build a modern responsive website for your business.",
      status: "pending",
      createdAt: "1 day ago",
      bidDate: "1 day ago",
      timeframe: "2 weeks",
      proposal: "I can build a modern responsive website for your business."
    },
    {
      id: "bid2",
      jobId: "job102",
      jobTitle: "Mobile App Design",
      bidderId: "user1",
      bidderName: "Sarah Johnson",
      amount: 800,
      message: "I'll create a beautiful mobile app design.",
      status: "accepted",
      createdAt: "3 days ago",
      bidDate: "3 days ago",
      timeframe: "1 week",
      proposal: "I'll create a beautiful mobile app design."
    }
  ];

  // Mock jobs for bids reference
  const mockJobsForBids = [
    { id: "job101", title: "Website Development", location: "Remote" },
    { id: "job102", title: "Mobile App Design", location: "San Francisco, CA" },
    { id: "job103", title: "E-commerce Website Development", location: "New York, NY" },
    { id: "job104", title: "Web Application Development", location: "Chicago, IL" }
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
        proposal: "I have extensive experience in plumbing repairs and can fix your kitchen sink issue efficiently. I'll provide all necessary parts and ensure the job is done to your satisfaction.",
        timeframe: "2-3 days",
        bidDate: "2 hours ago",
        status: "pending",
        bidderSkills: ["Plumbing", "Home Repair", "Emergency Services"]
      },
      {
        id: "bid2",
        bidderName: "Maria Santos",
        bidderRating: 4.9,
        bidderReviews: 31,
        amount: 380,
        proposal: "Professional plumber with 8+ years experience. I can diagnose and fix your kitchen sink problem quickly. Free estimates and warranty on all work.",
        timeframe: "1-2 days",
        bidDate: "4 hours ago",
        status: "pending",
        bidderSkills: ["Plumbing", "Kitchen Repairs", "Leak Detection"]
      },
      {
        id: "bid3",
        bidderName: "John Mitchell",
        bidderRating: 4.6,
        bidderReviews: 18,
        amount: 520,
        proposal: "Licensed plumber available for immediate service. I specialize in kitchen repairs and can provide same-day service if needed.",
        timeframe: "Same day",
        bidDate: "6 hours ago",
        status: "accepted",
        bidderSkills: ["Licensed Plumber", "Emergency Repair", "Kitchen Specialist"]
      }
    ],
    "job2": [
      {
        id: "bid4",
        bidderName: "Sarah Design Studio",
        bidderRating: 4.9,
        bidderReviews: 45,
        amount: 1200,
        proposal: "We specialize in tech startup branding and have created logos for over 50+ startups. Our package includes logo variations, brand guidelines, and source files.",
        timeframe: "5-7 days",
        bidDate: "1 day ago",
        status: "pending",
        bidderSkills: ["Logo Design", "Brand Identity", "Tech Startups"]
      },
      {
        id: "bid5",
        bidderName: "Creative Minds Co",
        bidderRating: 4.7,
        bidderReviews: 29,
        amount: 950,
        proposal: "Professional logo design with unlimited revisions. We'll create a modern, memorable logo that represents your tech startup's vision and values.",
        timeframe: "3-5 days",
        bidDate: "1 day ago",
        status: "pending",
        bidderSkills: ["Graphic Design", "Branding", "Digital Design"]
      }
    ]
  };

  // Use mock data instead of Redux state
  const currentUserJobs = mockUserJobs;
  const currentUserBids = mockUserBids;

  const handleViewJobDetails = (job) => {
    navigate(`/job/${job.id}`);
  };

  const handleCloseJobModal = () => {
    setIsJobModalOpen(false);
    setSelectedJob(null);
  };

  const handleAcceptBid = (bidId) => {
    console.log(`Accepting bid ${bidId}`);
    // Implement bid acceptance logic (e.g., dispatch action to update bid status)
  };

  const handleRejectBid = (bidId) => {
    console.log(`Rejecting bid ${bidId}`);
    // Implement bid rejection logic (e.g., dispatch action to update bid status)
  };

  const handlePostNewJob = () => {
    navigate('/post-job');
  };

  const handleBrowseJobs = () => {
    navigate('/jobs');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Welcome back, <span className="text-blue-600">{user?.name || 'Sarah'}</span>
            </h1>
            <p className="text-xl text-gray-600">
              Here's what's happening with your jobs and bids.
            </p>
          </div>

          {/* Stats Cards */}
          {statsLoading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jobs Posted</p>
                      <p className="text-2xl font-bold">{dashboardStats.jobsPosted}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Bids</p>
                      <p className="text-2xl font-bold">{dashboardStats.activeBids}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold">{dashboardStats.completedJobs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Earned</p>
                      <p className="text-2xl font-bold">${dashboardStats.totalEarned}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="my-jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger 
                value="my-jobs" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                My Jobs (Hiring)
              </TabsTrigger>
              <TabsTrigger 
                value="my-bids" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                My Bids (Working)
              </TabsTrigger>
            </TabsList>

            {/* My Jobs Tab */}
            <TabsContent value="my-jobs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Jobs You've Posted</h2>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white" 
                  onClick={handlePostNewJob}
                >
                  Post New Job
                </Button>
              </div>

              {jobsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => <EnhancedCardSkeleton key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUserJobs.map((job) => (
                    <Card key={job.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                                  {job.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Posted {job.postedAt}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge 
                                variant={job.status === 'open' ? 'default' : 'secondary'}
                                className={job.status === 'open' 
                                  ? 'bg-green-100 text-green-800 border border-green-200' 
                                  : 'bg-gray-100 text-gray-600 border border-gray-200'
                                }
                              >
                                {job.status === 'open' ? 'Active' : 'Completed'}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{job.views} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{job.bidsCount} bids</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{formatBudget(job.budget)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleViewJobDetails(job)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Messages
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* My Bids Tab */}
            <TabsContent value="my-bids" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Your Active Bids</h2>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  onClick={handleBrowseJobs}
                >
                  Browse Jobs
                </Button>
              </div>

              {bidsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => <EnhancedCardSkeleton key={i} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUserBids.map((bid) => {
                    const relatedJob = mockJobsForBids.find(job => job.id === bid.jobId);
                    
                    return (
                      <Card key={bid.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                                    {relatedJob ? relatedJob.title : bid.jobTitle}
                                  </h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{relatedJob ? relatedJob.location : 'Remote'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>Bid placed {bid.bidDate}</span>
                                    </div>
                                  </div>
                                </div>
                                <Badge 
                                  variant={bid.status === 'accepted' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'}
                                  className={
                                    bid.status === 'accepted' 
                                      ? 'bg-green-100 text-green-800 border border-green-200'
                                      : bid.status === 'rejected'
                                      ? 'bg-red-100 text-red-800 border border-red-200'
                                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  }
                                >
                                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>Your bid: ${bid.amount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{bid.timeframe}</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {bid.proposal}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            {bid.status === 'pending' && (
                              <>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Message Client
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/job/${bid.jobId}`)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  View Job
                                </Button>
                              </>
                            )}
                            
                            {bid.status === 'accepted' && (
                              <>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Contact Client
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call
                                </Button>
                              </>
                            )}
                            
                            {bid.status === 'rejected' && (
                              <Button variant="outline" size="sm" className="flex-1" disabled>
                                Bid Rejected
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Job Details Modal */}
      <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedJob?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              Posted on {selectedJob?.postedAt} • {selectedJob?.status === 'open' ? 'Active' : 'Completed'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6">
              {/* Job Status and Budget */}
              <div className="flex flex-wrap gap-4">
                <Badge 
                  variant={selectedJob.status === 'open' ? 'default' : 'secondary'}
                  className={selectedJob.status === 'open' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
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

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Skills Required */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bids Received */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Bids Received ({mockJobBids[selectedJob.id]?.length || 0})
                </h3>
                
                {/* Bid Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Total Views</span>
                    </div>
                    <p className="text-2xl font-bold">{selectedJob.views || 45}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Total Bids</span>
                    </div>
                    <p className="text-2xl font-bold">{mockJobBids[selectedJob.id]?.length || 0}</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Avg Bid</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${mockJobBids[selectedJob.id]?.length ? 
                        Math.round(mockJobBids[selectedJob.id].reduce((sum, bid) => sum + bid.amount, 0) / mockJobBids[selectedJob.id].length) 
                        : 0}
                    </p>
                  </Card>
                </div>

                {/* Individual Bids */}
                <div className="space-y-4">
                  {mockJobBids[selectedJob.id]?.map((bid) => (
                    <Card key={bid.id} className="p-4 border-l-4 border-l-blue-100">
                      <div className="space-y-4">
                        {/* Bidder Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{bid.bidderName}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span>{bid.bidderRating}</span>
                                </div>
                                <span>•</span>
                                <span>{bid.bidderReviews} reviews</span>
                                <span>•</span>
                                <span>{bid.bidDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">${bid.amount}</p>
                            <p className="text-sm text-gray-600">{bid.timeframe}</p>
                          </div>
                        </div>

                        {/* Bid Status */}
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={bid.status === 'accepted' ? 'default' : bid.status === 'rejected' ? 'destructive' : 'secondary'}
                            className={
                              bid.status === 'accepted' 
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : bid.status === 'rejected'
                                ? 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }
                          >
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </Badge>
                        </div>

                        {/* Proposal */}
                        <div>
                          <h5 className="font-medium mb-2">Proposal</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{bid.proposal}</p>
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
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAcceptBid(bid.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept Bid
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-100"
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
                    </Card>
                  )) || (
                    <div className="text-center py-8 text-gray-600">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No bids received yet for this job.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleCloseJobModal}
                >
                  Close
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  View Messages
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Edit Job
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;