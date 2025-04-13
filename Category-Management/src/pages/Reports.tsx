
import { BarChart } from 'lucide-react';

const Reports = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <BarChart size={64} className="text-admin-purple mb-4" />
        <h1 className="text-2xl font-bold mb-2">Reports</h1>
        <p className="text-gray-500 text-center">
          This feature is coming soon. You'll be able to view sales and performance reports here.
        </p>
      </div>
    </div>
  );
};

export default Reports;
