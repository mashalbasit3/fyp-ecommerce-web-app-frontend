import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import apiService from '../utils/apiService';

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editedCategory, setEditedCategory] = useState({ _id: '', name: '', description: '' });
  const [view, setView] = useState('list');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);
  
  const fetchCategories = async () => {
    try {
      const response = await apiService.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e, target) => {
    const { name, value } = e.target;
    if (target === 'new') {
      setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    } else if (target === 'edit') {
      setEditedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await apiService.post('/categories', newCategory);
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategory({ name: '', description: '' });
      setView('list');
      setSuccessMessage('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await apiService.put(`/categories/${editedCategory._id}`, editedCategory);
      const updatedCategories = categories.map((category) =>
        category._id === response.data._id ? response.data : category
      );
      setCategories(updatedCategories);
      setView('list');
      setEditedCategory({ _id: '', name: '', description: '' });
      setSuccessMessage('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await apiService.delete(`/categories/${categoryId}`);
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleShowEditForm = (category) => {
    setEditedCategory(category);
    setView('edit');
  };

  const handleCancelEdit = () => {
    setEditedCategory({ _id: '', name: '', description: '' });
    setView('list');
  };

  const renderView = () => {
    switch (view) {

      case 'list':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Category List</h3>
            <ul>
              {categories.map((category) => (
                <li key={category._id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <div>
                      <p className="text-lg font-semibold">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handleShowEditForm(category)} className="text-blue-500 mx-2">
                      <AiOutlineEdit />
                    </button>
                    <button type="button" className="text-red-500 mx-2" onClick={() => handleDeleteCategory(category._id)}>
                      <AiOutlineDelete />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'add':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={(e) => handleInputChange(e, 'new')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newCategory.description}
                  onChange={(e) => handleInputChange(e, 'new')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </form>
            <button type="button" onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2">
              Add Category
            </button>
          </div>
        );

      case 'edit':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Edit Category</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedCategory.name}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editedCategory.description}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </form>
            <button type="button" onClick={handleUpdateCategory} className="bg-green-500 text-white px-4 py-2 mr-2">
              Update Category
            </button>
            <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2">
              Cancel
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <button type="button" onClick={() => setView('add')} className="text-green-500">
          <AiOutlinePlus className="text-2xl" />
        </button>
      </div>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {renderView()}
    </div>
  );
};

export default CategoriesManager;
