
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '@/components/RegisterForm';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
          </CardHeader>
          <RegisterForm />
          <div className="px-6 py-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary underline underline-offset-4">
              Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
