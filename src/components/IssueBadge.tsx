
import { IssueStatus, IssuePriority, IssueCategory } from '@/types';
import { cn } from '@/lib/utils';

interface IssueBadgeProps {
  type: 'status' | 'priority' | 'category';
  value: IssueStatus | IssuePriority | IssueCategory;
  className?: string;
}

export function IssueBadge({ type, value, className }: IssueBadgeProps) {
  const getStatusClasses = (status: IssueStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
  };

  const getPriorityClasses = (priority: IssuePriority) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const getCategoryClasses = (category: IssueCategory) => {
    switch (category) {
      case 'facilities':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'academics':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'administration':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      case 'others':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getBadgeClasses = () => {
    if (type === 'status') return getStatusClasses(value as IssueStatus);
    if (type === 'priority') return getPriorityClasses(value as IssuePriority);
    if (type === 'category') return getCategoryClasses(value as IssueCategory);
    return '';
  };

  const formatValue = (value: string) => {
    return value.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      getBadgeClasses(),
      className
    )}>
      {formatValue(value)}
    </span>
  );
}
