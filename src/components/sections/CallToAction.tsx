import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="py-20 lg:py-32 gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container-mobile relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-white/80" />
            <span className="text-white/80 font-medium">Ready to get started?</span>
            <Sparkles className="w-5 h-5 text-white/80" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Join Thousands of
            <br />
            <span className="text-white/90">Local Professionals</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to hire skilled professionals or showcase your talents, 
            HireNearby is your gateway to local opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm" 
              asChild
            >
              <Link to="/jobs">
                Browse Jobs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button 
              variant="default" 
              size="lg" 
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90" 
              asChild
            >
              <Link to="/register">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-12 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Verified profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};