import { useState, useEffect } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  PlusCircle, 
  MapPin, 
  DollarSign, 
  Calendar,
  Upload,
  Info 
} from "lucide-react";
import { PageLoader } from "@/components/ui/loading-spinner";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budgetType: "fixed" as 'fixed' | 'hourly' | 'monthly',
    budgetMin: "",
    budgetMax: "",
    budgetRate: "",
    deadline: "",
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <PageLoader message="Loading job posting form..." />;
  }

  const categories = [
    "Home Services",
    "Design & Creative",
    "Technology",
    "Writing & Translation",
    "Marketing",
    "Business",
    "Cleaning",
    "Handyman",
    "Other"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-8 pb-16">
        <div className="container-mobile max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Post a <span className="text-primary">New Job</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the right professional for your project. Fill out the details below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-primary" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Need a plumber to fix kitchen sink"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project in detail. Include requirements, timeline, and any specific instructions..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Location & Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter your address or area"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Budget Type</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant={formData.budgetType === 'fixed' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFormData({...formData, budgetType: 'fixed'})}
                          className="text-xs"
                        >
                          Fixed Range
                        </Button>
                        <Button
                          type="button"
                          variant={formData.budgetType === 'hourly' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFormData({...formData, budgetType: 'hourly'})}
                          className="text-xs"
                        >
                          Per Hour
                        </Button>
                        <Button
                          type="button"
                          variant={formData.budgetType === 'monthly' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFormData({...formData, budgetType: 'monthly'})}
                          className="text-xs"
                        >
                          Per Month
                        </Button>
                      </div>
                    </div>

                    {formData.budgetType === 'fixed' ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budgetMin">Budget Min ($)</Label>
                          <Input
                            id="budgetMin"
                            type="number"
                            placeholder="50"
                            value={formData.budgetMin}
                            onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budgetMax">Budget Max ($)</Label>
                          <Input
                            id="budgetMax"
                            type="number"
                            placeholder="200"
                            value={formData.budgetMax}
                            onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="budgetRate">
                          Rate (${formData.budgetType === 'hourly' ? 'per hour' : 'per month'})
                        </Label>
                        <Input
                          id="budgetRate"
                          type="number"
                          placeholder={formData.budgetType === 'hourly' ? '25' : '2500'}
                          value={formData.budgetRate}
                          onChange={(e) => setFormData({...formData, budgetRate: e.target.value})}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Preferred Completion Date</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-success" />
                    Attachments (Optional)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, PDF (Max 10MB each)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posting Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Posting Fee</span>
                    <span className="font-semibold text-success">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="text-sm">5% on completion</span>
                  </div>
                  <div className="border-t pt-4">
                    <Button 
                      variant="hero" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                      onClick={() => {
                        setIsSubmitting(true);
                        setTimeout(() => setIsSubmitting(false), 2000);
                      }}
                    >
                      {isSubmitting ? (
                        <PageLoader message="Posting job..." />
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Post Job
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Info className="w-5 h-5 text-primary" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p>Write a clear, detailed job description</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p>Set a realistic budget range</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p>Include photos or files if relevant</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p>Respond to bids promptly</p>
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

export default PostJob;