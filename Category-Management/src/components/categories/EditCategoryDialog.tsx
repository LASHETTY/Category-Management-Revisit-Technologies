
import { useState, useEffect } from 'react';
import { Category, useCategory } from '@/contexts/CategoryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EditCategoryDialogProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

const EditCategoryDialog = ({ category, isOpen, onClose }: EditCategoryDialogProps) => {
  const { updateCategory, isLoading } = useCategory();
  const [name, setName] = useState(category.name);
  const [itemCount, setItemCount] = useState(category.itemCount.toString());
  const [imageUrl, setImageUrl] = useState(category.image);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update form when category changes
    if (isOpen) {
      setName(category.name);
      setItemCount(category.itemCount.toString());
      setImageUrl(category.image);
      setError(null);
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      setError('Category name is required');
      return;
    }
    
    const count = parseInt(itemCount);
    if (isNaN(count) || count < 0) {
      setError('Item count must be a valid positive number');
      return;
    }
    
    updateCategory(category.id, {
      name,
      itemCount: count,
      image: imageUrl,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the details for this category
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-itemCount" className="text-right">
                Item Count
              </Label>
              <Input
                id="edit-itemCount"
                value={itemCount}
                onChange={(e) => setItemCount(e.target.value)}
                type="number"
                min="0"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="edit-imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">Preview</div>
              <div className="col-span-3 h-24 rounded overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt="Category preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=Invalid+Image+URL';
                  }}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-admin-purple hover:bg-admin-purple-dark" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
