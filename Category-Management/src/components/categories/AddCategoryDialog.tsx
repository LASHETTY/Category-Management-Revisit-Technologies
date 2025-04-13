
import { useState } from 'react';
import { useCategory } from '@/contexts/CategoryContext';
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

interface AddCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryDialog = ({ isOpen, onClose }: AddCategoryDialogProps) => {
  const { addCategory, isLoading } = useCategory();
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState('0');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

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
    
    // Use default image if none provided
    const finalImageUrl = imageUrl || 'https://placehold.co/300x200/e2e8f0/64748b?text=New+Category';
    
    addCategory({
      name,
      itemCount: count,
      image: finalImageUrl,
    });
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setItemCount('0');
    setImageUrl('');
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category for your store
            </DialogDescription>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g. Summer Collection"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemCount" className="text-right">
                Item Count
              </Label>
              <Input
                id="itemCount"
                value={itemCount}
                onChange={(e) => setItemCount(e.target.value)}
                type="number"
                min="0"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {imageUrl && (
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
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-admin-purple hover:bg-admin-purple-dark" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
