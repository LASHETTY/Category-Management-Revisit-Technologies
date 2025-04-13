
import { Users } from 'lucide-react';

const Customers = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <Users size={64} className="text-admin-purple mb-4" />
        <h1 className="text-2xl font-bold mb-2">Customers</h1>
        <p className="text-gray-500 text-center">
          This feature is coming soon. You'll be able to manage your customers here.
        </p>
      </div>
    </div>
  );
};

export default Customers;
