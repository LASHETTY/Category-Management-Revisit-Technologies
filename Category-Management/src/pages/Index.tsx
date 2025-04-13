
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-admin-purple">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">CategoryHive</h1>
          <p className="mt-2 text-gray-600">E-commerce Category Management Dashboard</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Manage your e-commerce categories with our easy-to-use dashboard. Add, edit, and organize your product categories.
          </p>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate('/login')}
              className="bg-admin-purple hover:bg-admin-purple-dark"
            >
              Sign in to Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/signup')}
            >
              Create an Account
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>Demo credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
