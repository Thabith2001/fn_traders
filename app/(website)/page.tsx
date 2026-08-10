import React from 'react';
import Hero from "@/app/components/hero";
import ProductsSection from "@/app/components/products";

const App = () => {
    return (
        <>
           <div id="hero">
               <Hero/>
           </div>
            <div id="products">
                <ProductsSection/>
            </div>

        </>
    );
};

export default App;
