
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIssues } from '@/contexts/IssueContext';
import { Navbar } from '@/components/Navbar';
import { IssueCard } from '@/components/IssueCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { issues, isLoading } = useIssues();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (!user) {
    return null; // or a loading state
  }

  // Filter issues based on user role
  const filteredIssues = user.role === 'admin'
    ? issues.filter(issue => issue.status !== 'resolved').slice(0, 6)
    : issues.filter(issue => issue.createdBy.id === user.id).slice(0, 6);

  const recentIssues = [...issues].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => navigate('/issues/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Issue
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Total Issues</h3>
            <p className="text-3xl font-bold">{issues.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Resolved Issues</h3>
            <p className="text-3xl font-bold">
              {issues.filter(issue => issue.status === 'resolved').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Open Issues</h3>
            <p className="text-3xl font-bold">
              {issues.filter(issue => issue.status !== 'resolved').length}
            </p>
          </div>
        </div>

        {user.role === 'admin' ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Issues Needing Attention</h2>
                <Button variant="outline" onClick={() => navigate('/issues')}>
                  View All
                </Button>
              </div>
              {filteredIssues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIssues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No issues need attention right now.</p>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Recent Issues</h2>
                <Button variant="outline" onClick={() => navigate('/issues')}>
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentIssues.map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Your Issues</h2>
                <Button variant="outline" onClick={() => navigate('/issues')}>
                  View All
                </Button>
              </div>
              {filteredIssues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIssues.map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't created any issues yet.</p>
                  <Button onClick={() => navigate('/issues/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Issue
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Recent Campus Issues</h2>
                <Button variant="outline" onClick={() => navigate('/issues')}>
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentIssues.map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
