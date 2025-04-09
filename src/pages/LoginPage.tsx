
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/LoginForm';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Login to Your Account</CardTitle>
          </CardHeader>
          <LoginForm />
          <div className="px-6 py-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary underline underline-offset-4">
              Register
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
