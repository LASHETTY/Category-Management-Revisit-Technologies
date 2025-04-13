
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Category, useCategory } from '@/contexts/CategoryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CategoryCard from '@/components/categories/CategoryCard';
import AddCategoryDialog from '@/components/categories/AddCategoryDialog';

const CategoryList = () => {
  const { categories } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 h-9 bg-gray-50 border-gray-200 w-full"
            />
          </div>
          
          <Button 
            className="bg-admin-purple hover:bg-admin-purple-dark flex items-center gap-2" 
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={18} />
            <span>Add Category</span>
          </Button>
        </div>
      </div>
      
      {filteredCategories.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
      
      <AddCategoryDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />
    </div>
  );
};

export default CategoryList;
