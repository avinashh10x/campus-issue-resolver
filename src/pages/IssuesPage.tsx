
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIssues } from '@/contexts/IssueContext';
import { Navbar } from '@/components/Navbar';
import { IssueCard } from '@/components/IssueCard';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { IssueFilter, IssueFilters } from '@/components/IssueFilter';
import { IssueSort } from '@/components/IssueSort';

const IssuesPage = () => {
  const { issues } = useIssues();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<IssueFilters>({});
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-voted' | 'least-voted'>('newest');

  const filteredIssues = useMemo(() => {
    // First filter by search query
    let result = issues.filter(issue => 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Then apply status/priority/category filters
    if (filters.status) {
      result = result.filter(issue => issue.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter(issue => issue.priority === filters.priority);
    }
    if (filters.category) {
      result = result.filter(issue => issue.category === filters.category);
    }
    
    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'most-voted':
          return b.votes - a.votes;
        case 'least-voted':
          return a.votes - b.votes;
        default:
          return 0;
      }
    });
  }, [issues, searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Campus Issues</h1>
          <Button onClick={() => navigate('/issues/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Issue
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <IssueFilter onFilterChange={setFilters} />
          <IssueSort onSortChange={setSortBy} initialSort={sortBy} />
        </div>

        {filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No issues found matching your criteria.</p>
            <Button onClick={() => {
              setSearchQuery('');
              setFilters({});
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default IssuesPage;
