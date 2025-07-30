import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryTree from "@/components/reusable/CategoryTree";
import { productCategoriesService } from "@/services/product-categoies.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Category {
  _id: string;
  name: string;
  description: string;
  parentCategory?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const Categories = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => productCategoriesService.getCategories(),
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (categoryId: string) => productCategoriesService.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutate: addCategory } = useMutation({
    mutationFn: (data: { name: string; description: string; parentCategory?: string; images?: string[] }) => 
      productCategoriesService.addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: (data: { id: string; name: string; description: string; images?: string[] }) => 
      productCategoriesService.updateCategory(data.id, { name: data.name, description: data.description, images: data.images }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutate: toggleStatus } = useMutation({
    mutationFn: (data: { id: string; isActive: boolean }) => 
      productCategoriesService.updateCategory(data.id, { isActive: data.isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleAddCategory = (parentId: string | null, name: string, description: string, images?: string[]) => {
    addCategory({
      name,
      description,
      parentCategory: parentId || undefined,
      images
    });
  };

  const handleUpdateCategory = (categoryId: string, name: string, description: string, images?: string[]) => {
    console.log("images", images);
    updateCategory({
      id: categoryId,
      name,
      description,
      images
    });
  };

  const handleToggleStatus = (categoryId: string, isActive: boolean) => {
    console.log('Toggling status for category:', categoryId, 'to:', isActive);
    toggleStatus({
      id: categoryId,
      isActive
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
  };

  const handleEditCategory = (categoryId: string) => {
    navigate(`/profile/system-parameters/categories/edit/${categoryId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-bloom-green">
              <Tag className="h-5 w-5 mr-2 text-bloom-pink" />
              Product Categories
            </CardTitle>
            <CardDescription>
              Manage product categories and subcategories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
        <CardHeader>
          <CardTitle className="flex items-center text-bloom-green">
            <Tag className="h-5 w-5 mr-2 text-bloom-pink" />
            Product Categories
          </CardTitle>
          <CardDescription>
            Manage product categories and subcategories using the tree view below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryTree
            categories={categories || []}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onEditCategory={handleEditCategory}
            onUpdateCategory={handleUpdateCategory}
            onToggleStatus={handleToggleStatus}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories; 