import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchMyJobs } from "@/store/slices/jobsSlice";
import { fetchMyBids } from "@/store/slices/bidsSlice";
import { Navbar } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  TrendingUp,
  MapPin,
  Clock,
  Star,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { jobs } = useAppSelector((state) => state.jobs);
  const { bids } = useAppSelector((state) => state.bids);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyJobs());
      dispatch(fetchMyBids());
    }
  }, [dispatch, isAuthenticated]);

  const [activeView, setActiveView] = useState("overview");

  // Mock data
  const stats = {
    jobsPosted: 12,
    activeBids: 8,
    completedJobs: 25,
    totalEarnings: 2450
  };

  const userJobs = jobs.filter(job => job.postedBy === 'user1'); // Mock current user ID
  const userBids = bids;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-8">
        <div className="container-mobile">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Welcome back, <span className="text-primary">Sarah</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Here's what's happening with your jobs and bids.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Jobs Posted</p>
                    <p className="text-2xl font-bold text-primary">{stats.jobsPosted}</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Bids</p>
                    <p className="text-2xl font-bold text-accent">{stats.activeBids}</p>
                  </div>
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-success">{stats.completedJobs}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Earnings</p>
                    <p className="text-2xl font-bold text-success">${stats.totalEarnings}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="my-jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-muted/20">
              <TabsTrigger value="my-jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">My Jobs (Hiring)</TabsTrigger>
              <TabsTrigger value="my-bids" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">My Bids (Working)</TabsTrigger>
            </TabsList>

            {/* My Jobs Tab */}
            <TabsContent value="my-jobs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Jobs You've Posted</h2>
                <Button variant="hero" className="gradient-primary">Post New Job</Button>
              </div>

              <div className="space-y-4">
                {userJobs.map((job) => (
                  <Card key={job.id} className="card-elevated hover:shadow-strong transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              job.status === 'open' 
                                ? 'bg-success/20 text-success border border-success/30' 
                                : 'bg-muted/50 text-muted-foreground border border-muted'
                            }`}>
                              {job.status === 'open' ? 'Active' : 'Completed'}
                            </span>
                            <span className="text-sm text-muted-foreground">{job.postedAt}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{job.bidsCount || 0} bids</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>24 views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${job.budget.min} - ${job.budget.max}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Messages
                          </Button>
                          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Bids Tab */}
            <TabsContent value="my-bids" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Your Active Bids</h2>
                <Button variant="hero" className="gradient-primary">Browse Jobs</Button>
              </div>

              <div className="space-y-4">
                {userBids.map((bid) => (
                  <Card key={bid.id} className="card-elevated hover:shadow-strong transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              bid.status === 'accepted' 
                                ? 'bg-success/20 text-success border border-success/30' 
                                : bid.status === 'pending'
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : 'bg-muted/50 text-muted-foreground border border-muted'
                            }`}>
                              {bid.status === 'accepted' ? 'Accepted' : 'Pending'}
                            </span>
                            <span className="text-sm text-muted-foreground">to Job #{bid.jobId}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Job #{bid.jobId}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>Bid: ${bid.amount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{bid.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          {bid.status === 'accepted' && (
                            <Button variant="default" size="sm" className="bg-success hover:bg-success/90">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Start Work
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;