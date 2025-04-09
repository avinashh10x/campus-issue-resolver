
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type IssueStatus = 'open' | 'in-progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';
export type IssueCategory = 'facilities' | 'academics' | 'administration' | 'others';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  category: IssueCategory;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  assignedTo?: User;
  rating?: number;
  votes: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  issueId: string;
  isResponse: boolean;
  rating?: number;
}
