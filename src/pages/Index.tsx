
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClipboardList, MessageSquare, Star, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus Issue Resolver</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A platform for students to report issues on campus and for authorities to resolve them efficiently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Register Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/issues')}
                className="border-white text-white hover:bg-white/10"
              >
                Browse Issues
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <ClipboardList className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report an Issue</h3>
                <p className="text-gray-600">
                  Students can submit detailed reports about any issues they encounter on campus.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <MessageSquare className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Responses</h3>
                <p className="text-gray-600">
                  Campus authorities respond to reported issues with updates and resolution steps.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Star className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rate Solutions</h3>
                <p className="text-gray-600">
                  Rate the quality of responses and resolutions to help improve campus services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">150+</p>
                <p className="text-gray-600 text-center">Issues Resolved</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">200+</p>
                <p className="text-gray-600 text-center">Active Users</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">95%</p>
                <p className="text-gray-600 text-center">Satisfaction Rate</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">48h</p>
                <p className="text-gray-600 text-center">Avg. Response Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Campus?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our platform today and be part of the solution to make your campus better for everyone.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  "The campus issue resolver helped me get the broken AC fixed in our lecture hall within two days. Great platform!"
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Alex Johnson</p>
                    <p className="text-sm text-gray-500">Computer Science Student</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  "As an administrator, this platform has transformed how we handle student concerns. Much more efficient!"
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Maria Garcia</p>
                    <p className="text-sm text-gray-500">Campus Administrator</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  "The voting system ensures that the most important issues get addressed first. It's a democratic way to improve campus."
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">James Wilson</p>
                    <p className="text-sm text-gray-500">Engineering Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <ClipboardList className="h-6 w-6 mr-2" />
                <span className="font-bold text-xl">Campus Issue Resolver</span>
              </div>
              <p className="text-gray-400 mt-2">Making campus life better, one issue at a time.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Campus Issue Resolver. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
