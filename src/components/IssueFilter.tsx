
import { useState } from 'react';
import { IssueStatus, IssuePriority, IssueCategory } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

interface IssueFilterProps {
  onFilterChange: (filters: IssueFilters) => void;
}

export interface IssueFilters {
  status?: IssueStatus;
  priority?: IssuePriority;
  category?: IssueCategory;
}

export function IssueFilter({ onFilterChange }: IssueFilterProps) {
  const [filters, setFilters] = useState<IssueFilters>({});

  const handleFilterChange = (key: keyof IssueFilters, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value };
    
    // Remove undefined values
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k as keyof IssueFilters] === undefined) {
        delete newFilters[k as keyof IssueFilters];
      }
    });
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="status-filter">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value as IssueStatus)}
        >
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="priority-filter">Priority</Label>
        <Select
          value={filters.priority}
          onValueChange={(value) => handleFilterChange('priority', value as IssuePriority)}
        >
          <SelectTrigger id="priority-filter" className="w-[180px]">
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category-filter">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange('category', value as IssueCategory)}
        >
          <SelectTrigger id="category-filter" className="w-[180px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="facilities">Facilities</SelectItem>
            <SelectItem value="academics">Academics</SelectItem>
            <SelectItem value="administration">Administration</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(filters.status || filters.priority || filters.category) && (
        <div className="flex items-end">
          <Button variant="ghost" size="sm" onClick={clearFilters} className="mb-0.5">
            <XCircle className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
