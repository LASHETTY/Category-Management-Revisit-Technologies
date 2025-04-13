
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
}

interface CategoryContextProps {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Omit<Category, 'id'>>) => void;
  deleteCategory: (id: string) => void;
  isLoading: boolean;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

// Initial mock data
const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Men Clothes',
    itemCount: 125,
    image: 'https://image.hm.com/assets/hm/45/3d/453d85de4980560370364179eb4f8bbf84563ef2.jpg?imwidth=1260',
  },
  {
    id: '2',
    name: 'Women Clothes',
    itemCount: 156,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    name: 'Accessories',
    itemCount: 73,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    name: 'Cotton Clothes',
    itemCount: 65,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    name: 'Summer Clothes',
    itemCount: 92,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    name: 'Wedding Clothes',
    itemCount: 45,
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    name: 'Spring Collection',
    itemCount: 78,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80',
  },
  {
    id: '8',
    name: 'Casual Clothes',
    itemCount: 112,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80',
  },
  {
    id: '9',
    name: 'Hats',
    itemCount: 36,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  },
];

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const addCategory = (category: Omit<Category, 'id'>) => {
    setIsLoading(true);
    
    try {
      const newCategory = {
        ...category,
        id: Date.now().toString(),
      };
      
      setCategories((prev) => [...prev, newCategory]);
      
      toast({
        title: "Category added",
        description: `${category.name} has been added successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = (id: string, updatedData: Partial<Omit<Category, 'id'>>) => {
    setIsLoading(true);
    
    try {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, ...updatedData } : cat
        )
      );
      
      toast({
        title: "Category updated",
        description: "The category has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = (id: string) => {
    setIsLoading(true);
    
    try {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      
      toast({
        title: "Category deleted",
        description: "The category has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        isLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
