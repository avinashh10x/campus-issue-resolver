
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useIssues } from '@/contexts/IssueContext';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { IssueCard } from '@/components/IssueCard';

const ProfilePage = () => {
  const { user } = useAuth();
  const { issues } = useIssues();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Get user's issues
  const userIssues = issues.filter(issue => issue.createdBy.id === user.id);
  const resolvedIssues = userIssues.filter(issue => issue.status === 'resolved');
  const pendingIssues = userIssues.filter(issue => issue.status !== 'resolved');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-4 text-center md:text-left flex-1">
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-sm mt-2">
                      {user.role === 'admin' ? 'Administrator' : 'Student'}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="bg-muted p-2 rounded-md min-w-[100px] text-center">
                      <p className="text-2xl font-bold">{userIssues.length}</p>
                      <p className="text-xs text-muted-foreground">Total Issues</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md min-w-[100px] text-center">
                      <p className="text-2xl font-bold">{resolvedIssues.length}</p>
                      <p className="text-xs text-muted-foreground">Resolved</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md min-w-[100px] text-center">
                      <p className="text-2xl font-bold">{pendingIssues.length}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Recent Issues</h2>
              <Button variant="outline" onClick={() => navigate('/issues/new')}>
                Create New Issue
              </Button>
            </div>
            
            {userIssues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userIssues.slice(0, 4).map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't created any issues yet.</p>
                  <Button onClick={() => navigate('/issues/new')}>
                    Create Your First Issue
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {userIssues.length > 4 && (
              <div className="text-center mt-4">
                <Button variant="outline" onClick={() => navigate('/issues')}>
                  View All Your Issues
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
