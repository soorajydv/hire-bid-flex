import { Job } from '../store/slices/jobsSlice';

export const formatBudget = (budget: Job['budget']): string => {
  switch (budget.type) {
    case 'fixed':
      return `$${budget.min} - $${budget.max}`;
    case 'hourly':
      return `$${budget.rate}/hr`;
    case 'monthly':
      return `$${budget.rate}/month`;
    default:
      return `$${budget.min} - $${budget.max}`;
  }
};

export const getBudgetLabel = (budget: Job['budget']): string => {
  switch (budget.type) {
    case 'fixed':
      return 'Budget range';
    case 'hourly':
      return 'Hourly rate';
    case 'monthly':
      return 'Monthly rate';
    default:
      return 'Budget range';
  }
};

export const getBudgetValue = (budget: Job['budget']): number => {
  switch (budget.type) {
    case 'fixed':
      return (budget.min + budget.max) / 2; // Average for sorting/filtering
    case 'hourly':
    case 'monthly':
      return budget.rate || 0;
    default:
      return (budget.min + budget.max) / 2;
  }
};
