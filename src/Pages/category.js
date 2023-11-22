import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../utils/apiService.js';
import NavBar from '../components/navBar.js';
import Footer from '../components/footer.js';


const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await apiService.get(`/categories/${categoryName}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  if (!categoryData) {
    return null;
  }

  const { description, products } = categoryData;

  return (
    <>
    <NavBar />    
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">{categoryName}</h2>
          <p className="mt-4 text-gray-500">{description}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {products.map((product) => (

            <Link key={product._id} to={`/product/${product._id}`}>
              <article className="relative flex flex-col overflow-hidden rounded-lg border cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                    src={product.productPicUrl}
                    alt={product.title}
                  />
                </div>
                <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                  <div className="mb-2 flex">
                    <p className="mr-3 text-sm font-semibold">{`Rs. ${product.price}`}</p>
                    {product.discountedPrice && (
                      <del className="text-xs text-gray-400">{` Rs. ${product.discountedPrice}`}</del>
                    )}
                  </div>
                  <h3 className="mb-2 text-sm text-gray-400">{product.title}</h3>
                </div>
              </article>
            </Link>

          ))}
          
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default CategoryPage;
