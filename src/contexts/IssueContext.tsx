
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue, Comment, IssueStatus, IssuePriority, IssueCategory, User } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from "sonner";

interface IssueContextType {
  issues: Issue[];
  comments: Comment[];
  addIssue: (title: string, description: string, category: IssueCategory, priority: IssuePriority) => Promise<Issue>;
  updateIssueStatus: (issueId: string, status: IssueStatus) => Promise<void>;
  addComment: (issueId: string, content: string, isResponse: boolean) => Promise<Comment>;
  voteIssue: (issueId: string, increment: boolean) => Promise<void>;
  rateIssue: (issueId: string, rating: number) => Promise<void>;
  rateComment: (commentId: string, rating: number) => Promise<void>;
  assignIssue: (issueId: string, userId: string) => Promise<void>;
  getIssueById: (id: string) => Issue | undefined;
  getCommentsByIssueId: (issueId: string) => Comment[];
  isLoading: boolean;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

// Sample admin user for mocking
const adminUser: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@campus.edu',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
};

// Sample student user for mocking
const studentUser: User = {
  id: '1',
  name: 'John Student',
  email: 'student@campus.edu',
  role: 'student',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

// Mock data
const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Broken water fountain in Science Building',
    description: 'The water fountain on the 2nd floor of the Science Building is not working properly. It only dispenses hot water.',
    status: 'open',
    priority: 'medium',
    category: 'facilities',
    createdAt: new Date('2025-03-25T10:00:00Z'),
    updatedAt: new Date('2025-03-25T10:00:00Z'),
    createdBy: studentUser,
    votes: 5
  },
  {
    id: '2',
    title: 'Course registration system error',
    description: 'I am unable to register for COMP101 even though there are open slots. The system shows an error code E-435.',
    status: 'in-progress',
    priority: 'high',
    category: 'academics',
    createdAt: new Date('2025-03-24T15:30:00Z'),
    updatedAt: new Date('2025-03-26T09:15:00Z'),
    createdBy: studentUser,
    assignedTo: adminUser,
    votes: 8
  },
  {
    id: '3',
    title: 'Library hours during finals week',
    description: 'Can the library hours be extended during finals week? The current hours are not sufficient for studying.',
    status: 'resolved',
    priority: 'low',
    category: 'administration',
    createdAt: new Date('2025-03-20T11:45:00Z'),
    updatedAt: new Date('2025-03-27T14:20:00Z'),
    createdBy: studentUser,
    rating: 4,
    votes: 15
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'I have notified the facilities department. They will look into it as soon as possible.',
    createdAt: new Date('2025-03-25T14:30:00Z'),
    updatedAt: new Date('2025-03-25T14:30:00Z'),
    author: adminUser,
    issueId: '1',
    isResponse: true
  },
  {
    id: '2',
    content: 'I am also experiencing the same issue with course registration.',
    createdAt: new Date('2025-03-24T16:45:00Z'),
    updatedAt: new Date('2025-03-24T16:45:00Z'),
    author: studentUser,
    issueId: '2',
    isResponse: false
  },
  {
    id: '3',
    content: 'The IT department is working on fixing the registration system. Expected resolution by tomorrow.',
    createdAt: new Date('2025-03-26T09:15:00Z'),
    updatedAt: new Date('2025-03-26T09:15:00Z'),
    author: adminUser,
    issueId: '2',
    isResponse: true,
    rating: 5
  },
  {
    id: '4',
    content: 'We have decided to extend library hours during finals week. The library will now be open 24/7 for two weeks.',
    createdAt: new Date('2025-03-27T14:20:00Z'),
    updatedAt: new Date('2025-03-27T14:20:00Z'),
    author: adminUser,
    issueId: '3',
    isResponse: true,
    rating: 5
  }
];

export const IssueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIssues(mockIssues);
        setComments(mockComments);
      } catch (error) {
        toast.error('Failed to load issues');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addIssue = async (
    title: string,
    description: string,
    category: IssueCategory,
    priority: IssuePriority
  ): Promise<Issue> => {
    if (!user) throw new Error('You must be logged in to create an issue');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newIssue: Issue = {
        id: (issues.length + 1).toString(),
        title,
        description,
        status: 'open',
        priority,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: user,
        votes: 0
      };

      setIssues(prev => [...prev, newIssue]);
      toast.success('Issue created successfully');
      return newIssue;
    } catch (error) {
      toast.error('Failed to create issue');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateIssueStatus = async (issueId: string, status: IssueStatus): Promise<void> => {
    if (!user) throw new Error('You must be logged in to update an issue');
    if (user.role !== 'admin') throw new Error('Only admins can update issue status');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIssues(prev => 
        prev.map(issue => 
          issue.id === issueId 
            ? { ...issue, status, updatedAt: new Date() } 
            : issue
        )
      );
      toast.success(`Issue status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update issue status');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (issueId: string, content: string, isResponse: boolean): Promise<Comment> => {
    if (!user) throw new Error('You must be logged in to add a comment');
    if (isResponse && user.role !== 'admin') throw new Error('Only admins can add responses');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newComment: Comment = {
        id: (comments.length + 1).toString(),
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: user,
        issueId,
        isResponse
      };

      setComments(prev => [...prev, newComment]);
      
      if (isResponse) {
        // Update the issue status to in-progress if it was open
        setIssues(prev => 
          prev.map(issue => 
            issue.id === issueId && issue.status === 'open'
              ? { ...issue, status: 'in-progress', updatedAt: new Date() } 
              : issue
          )
        );
        toast.success('Response added successfully');
      } else {
        toast.success('Comment added successfully');
      }
      
      return newComment;
    } catch (error) {
      toast.error('Failed to add comment');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const voteIssue = async (issueId: string, increment: boolean): Promise<void> => {
    if (!user) throw new Error('You must be logged in to vote');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIssues(prev => 
        prev.map(issue => 
          issue.id === issueId 
            ? { 
                ...issue, 
                votes: increment ? issue.votes + 1 : Math.max(0, issue.votes - 1),
                updatedAt: new Date() 
              } 
            : issue
        )
      );
      toast.success(increment ? 'Vote added' : 'Vote removed');
    } catch (error) {
      toast.error('Failed to update vote');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const rateIssue = async (issueId: string, rating: number): Promise<void> => {
    if (!user) throw new Error('You must be logged in to rate an issue');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIssues(prev => 
        prev.map(issue => 
          issue.id === issueId 
            ? { ...issue, rating, updatedAt: new Date() } 
            : issue
        )
      );
      toast.success('Rating submitted');
    } catch (error) {
      toast.error('Failed to submit rating');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const rateComment = async (commentId: string, rating: number): Promise<void> => {
    if (!user) throw new Error('You must be logged in to rate a response');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, rating, updatedAt: new Date() } 
            : comment
        )
      );
      toast.success('Response rating submitted');
    } catch (error) {
      toast.error('Failed to submit response rating');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const assignIssue = async (issueId: string, userId: string): Promise<void> => {
    if (!user) throw new Error('You must be logged in to assign an issue');
    if (user.role !== 'admin') throw new Error('Only admins can assign issues');

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would fetch the assigned user from the database
      const assignedUser = adminUser; // Using mock admin for demo
      
      setIssues(prev => 
        prev.map(issue => 
          issue.id === issueId 
            ? { 
                ...issue, 
                assignedTo: assignedUser,
                status: 'in-progress',
                updatedAt: new Date() 
              } 
            : issue
        )
      );
      toast.success('Issue assigned successfully');
    } catch (error) {
      toast.error('Failed to assign issue');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getIssueById = (id: string): Issue | undefined => {
    return issues.find(issue => issue.id === id);
  };

  const getCommentsByIssueId = (issueId: string): Comment[] => {
    return comments.filter(comment => comment.issueId === issueId);
  };

  return (
    <IssueContext.Provider value={{
      issues,
      comments,
      addIssue,
      updateIssueStatus,
      addComment,
      voteIssue,
      rateIssue,
      rateComment,
      assignIssue,
      getIssueById,
      getCommentsByIssueId,
      isLoading
    }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};
