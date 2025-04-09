
import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({ 
  initialRating = 0, 
  onRatingChange, 
  readOnly = false,
  className
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;
    
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const handleMouseEnter = (hoveredRating: number) => {
    if (readOnly) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  return (
    <div className={cn("flex", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-5 w-5 cursor-pointer",
            readOnly ? "cursor-default" : "",
            (hoverRating || rating) >= star
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300",
            hoverRating >= star && !readOnly
              ? "text-yellow-500"
              : ""
          )}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}
