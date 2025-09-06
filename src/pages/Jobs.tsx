import { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Filter,
  Briefcase,
  DollarSign 
} from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Plumbing Repair - Kitchen Sink",
    description: "Need experienced plumber to fix leaking kitchen sink. Urgent repair needed.",
    category: "Home Services",
    location: "Downtown, City Center",
    budget: "$75-150",
    postedTime: "2 hours ago",
    bidsCount: 5,
    rating: 4.8,
    urgent: true
  },
  {
    id: 2,
    title: "Logo Design for Startup",
    description: "Looking for creative graphic designer to create modern logo for tech startup.",
    category: "Design",
    location: "Remote",
    budget: "$200-500",
    postedTime: "1 day ago",
    bidsCount: 12,
    rating: 4.9,
    urgent: false
  },
  {
    id: 3,
    title: "House Cleaning Service",
    description: "Weekly house cleaning service needed for 3-bedroom home.",
    category: "Cleaning",
    location: "Suburbs, North District",
    budget: "$100-200",
    postedTime: "3 hours ago",
    bidsCount: 8,
    rating: 4.7,
    urgent: false
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-8">
        <div className="container-mobile">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Find Your Next <span className="text-primary">Opportunity</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover local jobs that match your skills and schedule.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg border p-6 mb-8 shadow-soft">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search jobs by title, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="whitespace-nowrap">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="hero">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="card-job group">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {job.urgent && (
                            <span className="bg-destructive/10 text-destructive text-xs font-medium px-2 py-1 rounded-full">
                              Urgent
                            </span>
                          )}
                          <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded-full">
                            {job.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.postedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.bidsCount} bids</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span>{job.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-3 pt-2">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                        <DollarSign className="w-4 h-4" />
                        {job.budget}
                      </div>
                      <p className="text-xs text-muted-foreground">Budget range</p>
                    </div>
                    <Button variant="hero" className="whitespace-nowrap">
                      Place Bid
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center py-12">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;