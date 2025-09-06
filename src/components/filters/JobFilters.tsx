import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setFilters, clearFilters } from '../../store/slices/jobsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { X, Filter } from 'lucide-react';

const categories = [
  'All Categories',
  'Home Services',
  'Design',
  'Cleaning',
  'Technology',
  'Handyman',
  'Moving',
  'Tutoring',
  'Pet Care',
  'Event Services',
];

interface JobFiltersProps {
  onApplyFilters?: () => void;
}

export const JobFilters = ({ onApplyFilters }: JobFiltersProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.jobs.filters);
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    onApplyFilters?.();
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      location: '',
      budgetMin: 0,
      budgetMax: 10000,
      urgent: false,
    };
    setLocalFilters(clearedFilters);
    dispatch(clearFilters());
    onApplyFilters?.();
  };

  const updateLocalFilter = (key: string, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {(filters.category || filters.location || filters.urgent || filters.budgetMin > 0) && (
          <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
        )}
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Filter Jobs</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={localFilters.category} 
            onValueChange={(value) => updateLocalFilter('category', value === 'All Categories' ? '' : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={localFilters.location}
            onChange={(e) => updateLocalFilter('location', e.target.value)}
            placeholder="Enter location"
          />
        </div>

        {/* Budget Range */}
        <div className="space-y-4">
          <Label>Budget Range: ${localFilters.budgetMin} - ${localFilters.budgetMax}</Label>
          <div className="space-y-3">
            <div>
              <Label className="text-sm text-muted-foreground">Minimum: ${localFilters.budgetMin}</Label>
              <Slider
                value={[localFilters.budgetMin]}
                onValueChange={([value]) => updateLocalFilter('budgetMin', value)}
                max={5000}
                min={0}
                step={25}
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Maximum: ${localFilters.budgetMax}</Label>
              <Slider
                value={[localFilters.budgetMax]}
                onValueChange={([value]) => updateLocalFilter('budgetMax', value)}
                max={10000}
                min={100}
                step={50}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Urgent Jobs */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgent"
            checked={localFilters.urgent}
            onCheckedChange={(checked) => updateLocalFilter('urgent', checked)}
          />
          <Label htmlFor="urgent">Urgent jobs only</Label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleApplyFilters}
            variant="hero"
            className="flex-1"
          >
            Apply Filters
          </Button>
          <Button 
            onClick={handleClearFilters}
            variant="outline"
            className="flex-1"
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};