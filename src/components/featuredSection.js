import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../utils/apiService';

function FeaturedSection(props) {
    const { name } = props;
    const [categoryData, setCategoryData] = useState(null);
  
    useEffect(() => {
      const fetchCategoryData = async () => {
        try {
          const response = await apiService.get(`/categories/${name}`);
          console.log(response);
          setCategoryData(response.data);
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      };
  
      fetchCategoryData();
    }, [name]);
  
    if (!categoryData) {
      return null;
    }
  
    const { description, products } = categoryData;
  
    // Shuffle the products array
    const shuffledProducts = shuffleArray(products);
  
    return (
        <section>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
              <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8 flex items-center">
                <div className="max-w-md mx-auto text-center lg:text-left">
                  <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{name}</h2>
                    <p className="mt-4 text-gray-500">{description}</p>
                  </header>
                  <Link
                    to={`/category/${name}`}
                    className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-900 border border-gray-900 rounded hover:shadow focus:outline-none focus:ring"
                  >
                    Shop All
                  </Link>
                </div>
              </div>
    
              <div className="lg:col-span-2 lg:py-8">
                <ul className="grid grid-cols-2 gap-4">
                  {shuffledProducts.slice(0, 2).map((product, index) => (
                    <li key={index} className="aspect-w-1 aspect-h-1">
                      <Link to={`/product/${product._id}`} className="block group aspect-content">
                        <img
                          src={product.productPicUrl}
                          alt={product.title}
                          className="object-cover h-22 rounded"
                        />
                        <div className="mt-3">
                          <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                            {product.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-700">{`Rs. ${product.price}`}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      );
      
  
    function shuffleArray(array) {
      // Copy the array to avoid mutating the original array
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
  }
  
  export default FeaturedSection;