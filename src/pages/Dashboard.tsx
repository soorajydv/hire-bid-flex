import { useState } from "react";
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
  const { myJobs } = useAppSelector((state) => state.jobs);
  const { myBids } = useAppSelector((state) => state.bids);

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

  const myJobs = [
    {
      id: 1,
      title: "Kitchen Sink Repair",
      status: "active",
      bids: 5,
      budget: "$75-150",
      posted: "2 days ago",
      views: 24
    },
    {
      id: 2,
      title: "Garden Landscaping",
      status: "completed",
      bids: 8,
      budget: "$300-500",
      posted: "1 week ago",
      views: 45
    }
  ];

  const myBids = [
    {
      id: 1,
      jobTitle: "Logo Design Project",
      bidAmount: "$250",
      status: "pending",
      submitted: "1 day ago",
      client: "Tech Startup"
    },
    {
      id: 2,
      jobTitle: "House Cleaning",
      bidAmount: "$120",
      status: "accepted",
      submitted: "3 days ago",
      client: "John Smith"
    }
  ];

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
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Jobs Posted</p>
                    <p className="text-2xl font-bold">{stats.jobsPosted}</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Bids</p>
                    <p className="text-2xl font-bold">{stats.activeBids}</p>
                  </div>
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{stats.completedJobs}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Earnings</p>
                    <p className="text-2xl font-bold">${stats.totalEarnings}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="my-jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-jobs">My Jobs (Hiring)</TabsTrigger>
              <TabsTrigger value="my-bids">My Bids (Working)</TabsTrigger>
            </TabsList>

            {/* My Jobs Tab */}
            <TabsContent value="my-jobs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Jobs You've Posted</h2>
                <Button variant="hero">Post New Job</Button>
              </div>

              <div className="space-y-4">
                {myJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-medium transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.status === 'active' 
                                ? 'bg-success/10 text-success' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {job.status === 'active' ? 'Active' : 'Completed'}
                            </span>
                            <span className="text-sm text-muted-foreground">{job.posted}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{job.bids} bids</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{job.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.budget}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Messages
                          </Button>
                          <Button variant="default" size="sm">
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
                <Button variant="hero">Browse Jobs</Button>
              </div>

              <div className="space-y-4">
                {myBids.map((bid) => (
                  <Card key={bid.id} className="hover:shadow-medium transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              bid.status === 'accepted' 
                                ? 'bg-success/10 text-success' 
                                : bid.status === 'pending'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {bid.status === 'accepted' ? 'Accepted' : 'Pending'}
                            </span>
                            <span className="text-sm text-muted-foreground">to {bid.client}</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{bid.jobTitle}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>Bid: {bid.bidAmount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{bid.submitted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          {bid.status === 'accepted' && (
                            <Button variant="success" size="sm">
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