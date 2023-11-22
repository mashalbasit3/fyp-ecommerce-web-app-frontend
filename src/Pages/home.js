import React, { useState, useEffect } from 'react';
import FeaturedSection from '../components/featuredSection.js';
import NavBar from '../components/navBar.js';
import Footer from '../components/footer.js';
import Hero from '../components/hero.js';
import apiService from '../utils/apiService.js'; 

function Home () {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchCategories = async () => {
        try {
            const response = await apiService.get('/categories'); 
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };

        fetchCategories();
    }, []);

    return (
        <>
          <NavBar />
          <Hero />
          <div id='categories'>
            {categories.map((category) => (
              <FeaturedSection key={category.id} name={category.name} />
            ))}
          </div>
          <Footer />
        </>
      );
    }

export default Home