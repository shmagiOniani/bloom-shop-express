import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, ChevronDown, Plus, Trash2, Edit, Folder, FolderOpen } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { uploadService } from "@/services/upload.service";

interface Category {
  _id: string;
  name: string;
  description: string;
  parentCategory?: string;
  isActive: boolean;
  images?: string[];
  children?: Category[];
}

interface CategoryTreeProps {
  categories: Category[];
  onAddCategory: (parentId: string | null, name: string, description: string, images?: string[]) => void;
  onDeleteCategory: (categoryId: string) => void;
  onEditCategory: (categoryId: string) => void;
  onUpdateCategory: (categoryId: string, name: string, description: string, images?: string[]) => void;
  onToggleStatus?: (categoryId: string, isActive: boolean) => void;
}

const CategoryTreeItem = ({ 
  category, 
  level = 0, 
  onAddCategory, 
  onDeleteCategory, 
  onEditCategory,
  onUpdateCategory,
  onToggleStatus,
}: {
  category: Category;
  level?: number;
  onAddCategory: (parentId: string | null, name: string, description: string, images?: string[]) => void;
  onDeleteCategory: (categoryId: string) => void;
  onEditCategory: (categoryId: string) => void;
  onUpdateCategory: (categoryId: string, name: string, description: string, images?: string[]) => void;
  onToggleStatus?: (categoryId: string, isActive: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryImages, setNewCategoryImages] = useState<string[]>([]);
  const [editName, setEditName] = useState(category.name);
  const [editDescription, setEditDescription] = useState(category.description || "");
  const [editImages, setEditImages] = useState<string[]>(category.images || []);

  const hasChildren = category.children && category.children.length > 0;

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(category._id, newCategoryName.trim(), newCategoryDescription.trim(), newCategoryImages);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryImages([]);
      setIsAdding(false);
      setIsExpanded(true); // Expand to show the new category
    }
  };

  const uploadImage = (file: File) => {
    return uploadService
      .uploadImage(file)
      .then((response) => {
        setNewCategoryImages([...newCategoryImages, response]);
        return response;
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCategory();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewCategoryName("");
      setNewCategoryDescription("");
    }
  };

  const handleEditSubmit = () => {
    if (editName.trim()) {
      console.log(editImages.concat(newCategoryImages));
      onUpdateCategory(category._id, editName.trim(), editDescription.trim(), editImages);
      setIsEditing(false);
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditName(category.name);
      setEditDescription(category.description || "");
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditName(category.name);
    setEditDescription(category.description || "");
  };

  return (
    <div className="space-y-1">
      <div 
        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
          level > 0 ? 'ml-' + (level * 4) : ''
        }`}
        style={{ marginLeft: level * 16 }}
      >
        {/* Expand/Collapse button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}

        {/* Category icon */}
        {isExpanded ? (
          <FolderOpen className="h-4 w-4 text-blue-500" />
        ) : (
          <Folder className="h-4 w-4 text-gray-500" />
        )}

        {/* Category name */}
        <span className="flex-1 font-medium">{category.name}</span>

        {/* Status toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={category.isActive}
            onCheckedChange={(checked) => {
              if (onToggleStatus) {
                onToggleStatus(category._id, checked);
              }
            }}
            className="data-[state=checked]:bg-bloom-green data-[state=unchecked]:bg-gray-200"
          />
          <span className={`text-xs font-medium ${
            category.isActive ? 'text-green-600' : 'text-gray-500'
          }`}>
            {category.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsAdding(true)}
            className="h-6 w-6 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleStartEdit}
            className="h-6 w-6 p-0"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDeleteCategory(category._id)}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Add new category form */}
      {isAdding && (
        <div 
          className="p-3 bg-blue-50 rounded-lg border border-blue-200"
          style={{ marginLeft: (level + 1) * 16 }}
        >
          <div className="space-y-4">
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            <Input
              placeholder="Description (optional)"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category Images</label>
              <ImageUploader
                value={newCategoryImages}
                onChange={setNewCategoryImages}
                uploadImage={uploadImage}
                maxImages={5}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddCategory}>
                Add
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setNewCategoryName("");
                  setNewCategoryDescription("");
                  setNewCategoryImages([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit category form */}
      {isEditing && (
        <div 
          className="p-3 bg-pink-50 rounded-lg border border-pink-200"
          style={{ marginLeft: (level + 1) * 16 }}
        >
          <div className="space-y-4">
            <Input
              placeholder="Category name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleEditKeyPress}
              autoFocus
            />
            <Input
              placeholder="Description (optional)"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleEditKeyPress}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category Images</label>
              <ImageUploader
                value={editImages}
                onChange={setEditImages}
                uploadImage={uploadImage}
                maxImages={5}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleEditSubmit} className="bg-pink-500 hover:bg-pink-600 text-white">
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setEditName(category.name);
                  setEditDescription(category.description || "");
                  setEditImages(category.images || []);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="space-y-1">
          {category.children!.map((child) => (
            <CategoryTreeItem
              key={child._id}
              category={child}
              level={level + 1}
              onAddCategory={onAddCategory}
              onDeleteCategory={onDeleteCategory}
              onEditCategory={onEditCategory}
              onUpdateCategory={onUpdateCategory}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryTree = ({ categories, onAddCategory, onDeleteCategory, onEditCategory, onUpdateCategory, onToggleStatus }: CategoryTreeProps) => {
  const [isAddingRoot, setIsAddingRoot] = useState(false);
  const [newRootName, setNewRootName] = useState("");
  const [newRootDescription, setNewRootDescription] = useState("");

  const handleAddRootCategory = () => {
    if (newRootName.trim()) {
      onAddCategory(null, newRootName.trim(), newRootDescription.trim());
      setNewRootName("");
      setNewRootDescription("");
      setIsAddingRoot(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddRootCategory();
    } else if (e.key === "Escape") {
      setIsAddingRoot(false);
      setNewRootName("");
      setNewRootDescription("");
    }
  };

  // Build tree structure from flat list
  const buildTree = (items: Category[]): Category[] => {
    const itemMap = new Map<string, Category>();
    const roots: Category[] = [];

    // Create a map of all items
    items.forEach(item => {
      itemMap.set(item._id, { ...item, children: [] });
    });

    // Build the tree structure
    items.forEach(item => {
      const node = itemMap.get(item._id)!;
      if (item.parentCategory && itemMap.has(item.parentCategory)) {
        const parent = itemMap.get(item.parentCategory)!;
        parent.children!.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const treeData = buildTree(categories);

  return (
    <div className="space-y-4">
      {/* Add root category button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Categories</h3>
        <Button
          size="sm"
          onClick={() => setIsAddingRoot(true)}
          className="bg-bloom-green hover:bg-bloom-green/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Root Category
        </Button>
      </div>

      {/* Add root category form */}
      {isAddingRoot && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="space-y-2">
            <Input
              placeholder="Root category name"
              value={newRootName}
              onChange={(e) => setNewRootName(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            <Input
              placeholder="Description (optional)"
              value={newRootDescription}
              onChange={(e) => setNewRootDescription(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddRootCategory}>
                Add
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setIsAddingRoot(false);
                  setNewRootName("");
                  setNewRootDescription("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tree view */}
      <div className="border rounded-lg p-4 bg-white">
        {treeData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Folder className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No categories available</p>
            <p className="text-sm">Click "Add Root Category" to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {treeData.map((category) => (
              <CategoryTreeItem
                key={category._id}
                category={category}
                onAddCategory={onAddCategory}
                onDeleteCategory={onDeleteCategory}
                onEditCategory={onEditCategory}
                onUpdateCategory={onUpdateCategory}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTree; 