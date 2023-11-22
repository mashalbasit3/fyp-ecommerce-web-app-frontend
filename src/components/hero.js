// Hero.js
import React from "react";
import { Link as ScrollLink } from 'react-scroll';
import '../index.css'; // Import your CSS file

function Hero() {
    return (
        <section className="overflow-hidden background-section">
            <div className="bg-black/25 h-screen p-8 md:p-12 lg:px-16 lg:py-24 flex items-center justify-center">
                <div className="text-center ltr:sm:text-left ">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                        ONE STOP SHOP
                    </h2>

                    <p className="hidden max-w-lg text-white/90 mx-auto md:mt-6 md:block md:text-lg md:leading-relaxed">
                        Come, look, buy, enjoy.
                    </p>

                    <div className="mt-4 sm:mt-8">
                        <ScrollLink
                            to="categories"
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                            className="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Shop
                        </ScrollLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
