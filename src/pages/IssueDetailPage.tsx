
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIssues } from '@/contexts/IssueContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { IssueBadge } from '@/components/IssueBadge';
import { CommentCard } from '@/components/CommentCard';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IssueStatus } from '@/types';

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    getIssueById, 
    getCommentsByIssueId, 
    voteIssue, 
    addComment, 
    updateIssueStatus,
    rateIssue
  } = useIssues();
  
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  const issue = getIssueById(id!);
  const comments = getCommentsByIssueId(id!);

  useEffect(() => {
    if (!issue) {
      navigate('/issues');
    }
  }, [issue, navigate]);

  if (!issue) {
    return null;
  }

  const handleVote = () => {
    if (!user) {
      toast.error('You must be logged in to vote');
      return;
    }
    voteIssue(issue.id, true);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addComment(issue.id, comment, user.role === 'admin');
      setComment('');
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (status: IssueStatus) => {
    if (!user || user.role !== 'admin') {
      toast.error('Only admins can update issue status');
      return;
    }
    
    setIsStatusUpdating(true);
    
    try {
      await updateIssueStatus(issue.id, status);
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const handleRating = async (rating: number) => {
    if (!user) {
      toast.error('You must be logged in to rate');
      return;
    }
    
    if (issue.status !== 'resolved') {
      toast.error('You can only rate resolved issues');
      return;
    }
    
    try {
      await rateIssue(issue.id, rating);
    } catch (error) {
      // Error is handled in the context
    }
  };
  
  // Sort comments to show responses first
  const sortedComments = [...comments].sort((a, b) => {
    // Official responses first
    if (a.isResponse && !b.isResponse) return -1;
    if (!a.isResponse && b.isResponse) return 1;
    
    // Then by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/issues')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Issues
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <IssueBadge type="status" value={issue.status} />
                  <IssueBadge type="priority" value={issue.priority} />
                  <IssueBadge type="category" value={issue.category} />
                </div>
                <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
                <div className="flex items-center gap-2 mb-6">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={issue.createdBy.avatar} />
                    <AvatarFallback>{issue.createdBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{issue.createdBy.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Posted on {format(new Date(issue.createdAt), 'PPP')}
                    </p>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{issue.description}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Comments & Responses</h2>
                {sortedComments.length > 0 ? (
                  <div className="space-y-4">
                    {sortedComments.map(comment => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                )}
              </div>
              
              {user && (
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    {user.role === 'admin' ? 'Add Official Response' : 'Add Comment'}
                  </h3>
                  <form onSubmit={handleCommentSubmit}>
                    <Textarea
                      placeholder={user.role === 'admin' 
                        ? "Write an official response..." 
                        : "Write your comment..."
                      }
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-2"
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6 sticky top-24">
              <div>
                <h3 className="text-lg font-medium mb-2">Issue Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <IssueBadge type="status" value={issue.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <IssueBadge type="priority" value={issue.priority} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <IssueBadge type="category" value={issue.category} />
                  </div>
                  {issue.assignedTo && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Assigned To:</span>
                      <span>{issue.assignedTo.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Actions</h3>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    onClick={handleVote}
                    disabled={!user}
                  >
                    <span>Upvote Issue</span>
                    <div className="flex items-center">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>{issue.votes}</span>
                    </div>
                  </Button>
                  
                  {user && user.role === 'admin' && (
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Update Status</label>
                      <Select
                        defaultValue={issue.status}
                        onValueChange={(value) => handleStatusChange(value as IssueStatus)}
                        disabled={isStatusUpdating}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {issue.status === 'resolved' && (
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        {issue.rating 
                          ? "Your Rating" 
                          : "Rate Resolution"
                        }
                      </label>
                      <StarRating 
                        initialRating={issue.rating} 
                        onRatingChange={handleRating}
                        readOnly={!!issue.rating || !user}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetailPage;
