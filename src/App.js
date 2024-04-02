import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const productsRef = useRef(null);

  useEffect(() => {
    const fetchAndRenderProducts = () => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
          renderProducts(data.products);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };

    const renderProducts = (products) => {
      const productsDiv = productsRef.current;
      if (!productsDiv) return;

      products.forEach(product => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = product.title;
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        col.appendChild(card);
        productsDiv.appendChild(col);
      });
    };

    fetchAndRenderProducts();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      <div className="row" ref={productsRef}></div>
    </div>
  );
}

export default App;
