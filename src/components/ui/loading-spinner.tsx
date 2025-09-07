import { cn } from "@/lib/utils";
import { Loader2, Briefcase, Users, DollarSign, CheckCircle } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <Loader2 
      className={cn(
        "animate-spin text-muted-foreground",
        sizeClasses[size],
        className
      )} 
    />
  );
};

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export const LoadingState = ({ 
  isLoading, 
  children, 
  loadingText = "Loading...",
  className 
}: LoadingStateProps) => {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span className="text-muted-foreground">{loadingText}</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
};

// Card skeleton for job/bid listings
export const CardSkeleton = () => {
  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
};

// Stats card skeleton with animated icons
export const StatsSkeleton = () => {
  const statsIcons = [Briefcase, Users, CheckCircle, DollarSign];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsIcons.map((Icon, index) => (
        <div key={index} className="p-6 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg animate-pulse">
              <Icon className="w-6 h-6 text-blue-600 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }} />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced card skeleton with shimmer effect
export const EnhancedCardSkeleton = () => {
  return (
    <div className="p-6 border rounded-lg space-y-4 bg-white shadow-sm relative overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
};

// Page loading spinner with logo animation
export const PageLoader = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center animate-bounce">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl animate-ping"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">HireNearby</h3>
          <p className="text-gray-600">{message}</p>
          <div className="flex justify-center">
            <LoadingSpinner size="md" className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
