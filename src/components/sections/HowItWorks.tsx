import { UserPlus, Search, MessageSquare, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and build your professional profile with skills, experience, and portfolio.",
    step: "01"
  },
  {
    icon: Search,
    title: "Browse or Post",
    description: "Find jobs that match your skills or post a job to find the right professional.",
    step: "02"
  },
  {
    icon: MessageSquare,
    title: "Connect & Negotiate",
    description: "Chat with potential hirers or workers, discuss details, and agree on terms.",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Complete & Review",
    description: "Finish the job, process secure payment, and leave reviews for future reference.",
    step: "04"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-mobile">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            How <span className="text-primary">HireNearby</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started is simple. Whether you're looking to hire or get hired, 
            our streamlined process makes it easy to connect and get things done.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center group">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" />
                )}
                
                <div className="relative z-10">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-primary/10 mb-4 group-hover:text-primary/20 transition-colors">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};