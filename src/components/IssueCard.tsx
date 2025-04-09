
import { Issue } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IssueBadge } from './IssueBadge';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIssues } from '@/contexts/IssueContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { voteIssue, getCommentsByIssueId } = useIssues();
  const { user } = useAuth();
  const comments = getCommentsByIssueId(issue.id);
  
  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      voteIssue(issue.id, true);
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <Link to={`/issues/${issue.id}`} className="block h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold line-clamp-2">{issue.title}</CardTitle>
            <IssueBadge type="status" value={issue.status} />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <IssueBadge type="category" value={issue.category} />
            <IssueBadge type="priority" value={issue.priority} />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{issue.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-0">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={issue.createdBy.avatar} />
              <AvatarFallback>{issue.createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={handleVote}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-xs">{issue.votes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{comments.length}</span>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
