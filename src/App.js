import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const createProductsDiv = () => {
      const productsDiv = document.createElement("div");
      productsDiv.id = "products";
      productsDiv.classList.add("row", "container")
      document.body.appendChild(productsDiv);
      return productsDiv;
    };

    const fetchAndRenderProducts = () => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
          renderProducts(data.products, null);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };

    const renderProducts = (products, search) => {
      const productsDiv = document.getElementById("products");
      if (!productsDiv) return;

      for (const key in products) {
        const product = products[key];
        if (!search || product.title.trim().toUpperCase() === search){
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.innerText = product.title;
        const cardPrice = document.createElement("p");
        cardPrice.innerText = `$${product.price}`;
        const cardImage = document.createElement("img");
        cardImage.src = product.images[0]
        cardImage.classList.add("img-fluid");
        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        card.appendChild(cardBody);
        col.appendChild(card);
        productsDiv.appendChild(col)
        }
      }
    };

    const productsDiv = createProductsDiv();
    fetchAndRenderProducts();

    return () => {
      document.body.removeChild(productsDiv);
    };
  }, []);

  return (
    <>
      <h1 className="container">Products</h1>
    </>
  );
}

export default App;
