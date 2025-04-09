
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type SortOption = 'newest' | 'oldest' | 'most-voted' | 'least-voted';

interface IssueSortProps {
  onSortChange: (sort: SortOption) => void;
  initialSort?: SortOption;
}

export function IssueSort({ onSortChange, initialSort = 'newest' }: IssueSortProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="sort-issues">Sort By</Label>
      <Select
        defaultValue={initialSort}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger id="sort-issues" className="w-[180px]">
          <SelectValue placeholder="Sort issues" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="most-voted">Most Voted</SelectItem>
          <SelectItem value="least-voted">Least Voted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
