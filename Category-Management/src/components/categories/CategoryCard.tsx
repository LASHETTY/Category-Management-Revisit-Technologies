
import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Category, useCategory } from '@/contexts/CategoryContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import EditCategoryDialog from '@/components/categories/EditCategoryDialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { deleteCategory } = useCategory();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Enhanced image error handling with proper path resolution
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', {
      src: e.currentTarget.src,
      category: category.name
    });
    e.currentTarget.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=Category+Image';
  };

  // Function to get correct image path
  const getImagePath = (imagePath: string) => {
    // If path is already absolute URL, use it directly
    if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
      return imagePath;
    }
    
    // If it's a relative path starting with "/lovable-uploads", ensure proper base URL
    if (imagePath.startsWith('/lovable-uploads')) {
      return imagePath.substring(1); // Remove the leading slash
    }
    
    return imagePath;
  };

  return (
    <div className="category-card bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48">
        <img
          src={getImagePath(category.image)}
          alt={category.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8 bg-white bg-opacity-80 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="cursor-pointer">
                <Edit size={16} className="mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600 cursor-pointer">
                <Trash2 size={16} className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.itemCount} items</p>
      </div>
      
      <EditCategoryDialog 
        category={category} 
        isOpen={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)} 
      />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{category.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteCategory(category.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryCard;
