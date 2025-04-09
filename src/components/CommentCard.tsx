
import { Comment } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { StarRating } from './StarRating';
import { useIssues } from '@/contexts/IssueContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const { rateComment } = useIssues();
  const { user } = useAuth();

  const handleRating = (rating: number) => {
    if (user && comment.isResponse) {
      rateComment(comment.id, rating);
    }
  };

  return (
    <Card className={cn(
      "mb-4", 
      comment.isResponse ? "border-l-4 border-l-primary" : ""
    )}>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">
            {comment.author.name}
            {comment.isResponse && (
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                Official Response
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{comment.content}</p>
      </CardContent>
      {comment.isResponse && (
        <CardFooter className="pt-0 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {user && !comment.rating ? "Rate this response:" : "Response rating:"}
          </span>
          <StarRating 
            initialRating={comment.rating} 
            onRatingChange={handleRating}
            readOnly={!!comment.rating || !user}
          />
        </CardFooter>
      )}
    </Card>
  );
}
