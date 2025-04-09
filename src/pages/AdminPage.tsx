
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIssues } from '@/contexts/IssueContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IssueBadge } from '@/components/IssueBadge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { IssueStatus } from '@/types';
import { Eye, Workflow, CheckSquare } from 'lucide-react';

const AdminPage = () => {
  const { user } = useAuth();
  const { issues, updateIssueStatus, isLoading } = useIssues();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  // Filter issues based on the active tab
  const filteredIssues = activeTab === 'all' 
    ? issues 
    : issues.filter(issue => {
        if (activeTab === 'open') return issue.status === 'open';
        if (activeTab === 'in-progress') return issue.status === 'in-progress';
        if (activeTab === 'resolved') return issue.status === 'resolved';
        return true;
      });

  const handleStatusChange = async (issueId: string, status: IssueStatus) => {
    await updateIssueStatus(issueId, status);
  };
  
  const openCount = issues.filter(issue => issue.status === 'open').length;
  const inProgressCount = issues.filter(issue => issue.status === 'in-progress').length;
  const resolvedCount = issues.filter(issue => issue.status === 'resolved').length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                Open Issues
                <span className="text-2xl font-bold">{openCount}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Issues waiting for response
                </span>
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                In Progress
                <span className="text-2xl font-bold">{inProgressCount}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Issues being worked on
                </span>
                <Workflow className="h-5 w-5 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                Resolved
                <span className="text-2xl font-bold">{resolvedCount}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Successfully resolved issues
                </span>
                <CheckSquare className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Issues</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.length > 0 ? (
                        filteredIssues.map(issue => (
                          <TableRow key={issue.id}>
                            <TableCell className="font-medium">{issue.title}</TableCell>
                            <TableCell>
                              <IssueBadge type="category" value={issue.category} />
                            </TableCell>
                            <TableCell>
                              <IssueBadge type="priority" value={issue.priority} />
                            </TableCell>
                            <TableCell>
                              <Select
                                defaultValue={issue.status}
                                onValueChange={value => handleStatusChange(issue.id, value as IssueStatus)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              {format(new Date(issue.createdAt), 'PP')}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/issues/${issue.id}`)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            No issues found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
