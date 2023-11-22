import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { saveAs } from 'file-saver';
import apiService from '../utils/apiService';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    productPicUrl: '',
  });
  const [editedProduct, setEditedProduct] = useState({
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    productPicUrl: '',
  });
  const [view, setView] = useState('list');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const fetchProducts = async () => {
    try {
      const response = await apiService.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e, target) => {
    const { name, value } = e.target;
    if (target === 'new') {
      setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    } else if (target === 'edit') {
      setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prevProduct) => ({ ...prevProduct, productPic: file }));
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      for (const key in newProduct) {
        formData.append(key, newProduct[key]);
      }

      // Assuming productPic is the name of the file input
      const file = formData.get('productPic');
      if (file) {
        const imageURL = URL.createObjectURL(file);
        const fileName = `src/assets/pics/${file.name}`;;
        saveAs(imageURL, fileName);
        setNewProduct((prevProduct) => ({ ...prevProduct, productPicUrl: fileName }));
      }
      const response = await apiService.post('/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProduct({
        title: '',
        description: '',
        price: 0,
        category: '',
        productPicUrl: '',
      });
      setView('list');
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await apiService.put(`/products/${editedProduct._id}`, editedProduct);
      const updatedProducts = products.map((product) =>
        product._id === response.data._id ? response.data : product
      );
      setProducts(updatedProducts);
      setView('list');
      setEditedProduct({
        _id: '',
        title: '',
        description: '',
        price: 0,
        category: '',
        productPicUrl: '',
      });
      setSuccessMessage('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiService.delete(`/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleShowEditForm = (product) => {
    setEditedProduct(product);
    setView('edit');
  };

  const handleCancelEdit = () => {
    setEditedProduct({
      _id: '',
      title: '',
      description: '',
      price: 0,
      category: '',
      productPicUrl: '',
    });
    setView('list');
  };

  const renderView = () => {
    switch (view) {

      case 'list':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Product List</h3>
            <ul>
              {products.map((product) => (
                <li key={product._id} className="flex items-center justify-between p-2 border-b">
                  <div className="flex items-center">
                    <img src={product.productPicUrl} alt={product.title} className="h-12 w-12 mr-4" />
                    <div>
                      <p className="text-lg font-semibold">{product.title}</p>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <p className="text-sm">{`Price: ${product.price}, Category ID: ${product.category}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button type="button" onClick={() => handleShowEditForm(product)} className="text-blue-500 mx-2">
                      <AiOutlineEdit />
                    </button>
                    <button type="button" className="text-red-500 mx-2" onClick={() => handleDeleteProduct(product._id)}>
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
            <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newProduct.title}
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
                  value={newProduct.description}
                  onChange={(e) => handleInputChange(e, 'new')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={(e) => handleInputChange(e, 'new')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category ID
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={(e) => handleInputChange(e, 'new')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
              <label htmlFor="productPic" className="block text-sm font-medium text-gray-700">
                Product Picture
              </label>
              <input
                type="file"
                id="productPic"
                name="productPic"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
              <button type="button" onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2">
                Add Product
              </button>
            </form>
          </div>
        );

      case 'edit':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Edit Product</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedProduct.title}
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
                  value={editedProduct.description}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editedProduct.price}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category ID
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={editedProduct.category}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productPicUrl" className="block text-sm font-medium text-gray-700">
                  Product Image URL
                </label>
                <input
                  type="text"
                  id="productPicUrl"
                  name="productPicUrl"
                  value={editedProduct.productPicUrl}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <button type="button" onClick={handleUpdateProduct} className="bg-green-500 text-white px-4 py-2 mr-2">
                Update Product
              </button>
              <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2">
                Cancel
              </button>
            </form>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button type="button" onClick={() => setView('add')} className="text-green-500">
          <AiOutlinePlus className="text-2xl" />
        </button>
      </div>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {renderView()}
    </div>
  );
};

export default ProductsManager;
