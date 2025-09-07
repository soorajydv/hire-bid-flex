import { Search, MapPin, Shield, Clock, Star, CreditCard } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Job Discovery",
    description: "Find relevant opportunities near you with smart matching and filtering options.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MapPin,
    title: "Local Focus",
    description: "Connect with people in your community for faster communication and local service.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Verified profiles, secure payments, and dispute resolution for peace of mind.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Get instant notifications about new jobs, bids, and messages to stay ahead.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Star,
    title: "Rating System",
    description: "Build your reputation with reviews and ratings from satisfied clients.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Secure payment processing with multiple options and milestone-based releases.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export const Features = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container-mobile">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Why Choose <span className="text-primary">HireNearby</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to hire the right person or find the perfect job, 
            all in one powerful platform designed for local communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20 hover:shadow-strong hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:bg-card/80 text-center"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};