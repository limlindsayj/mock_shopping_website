import React, { useEffect } from 'react';
import './App.css';

function App() {
  
  useEffect(() => {
    var cart = [];
    const createProductsDiv = () => {
      const productsDiv = document.createElement("div");
      productsDiv.id = "products";
      productsDiv.classList.add("row", "container")
      document.body.appendChild(productsDiv);
      return productsDiv;
    };

    const fetchAndRenderProducts = (search) => {
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
      const productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";
      if (!productsDiv) return;
      for (const key in products) {
        const product = products[key];
        const col = document.createElement("div");
        col.classList.add("col-md-3");
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
        const cardCartButton = document.createElement("button");
        cardCartButton.classList.add("cartButton");
        cardCartButton.innerText = "Add to cart";
        cardCartButton.id = product.id;
        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(cardCartButton);
        card.appendChild(cardBody);
        col.appendChild(card);
        productsDiv.appendChild(col)
        cardCartButton.onclick = () => addToCart(product.id);
      }
    };
    
    const searchClicked = () => {
      const search = document.getElementById("searchInput").value;

      fetch('https://dummyjson.com/products/search?q=' + search)
        .then(res => res.json())
        .then(data => {
          renderProducts(data.products);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
    const addToCart = (id) => {
      cart.push('https://dummyjson.com/products/1')
    }

    const openCart = () => {
      document.getElementById("cartModal").showModal();
    }

    const closeCart = () =>{
      document.getElementById("cartModal").close();
    }
    const productsDiv = createProductsDiv();
    fetchAndRenderProducts("");
    document.getElementById("searchButton").onclick = () => searchClicked ();
    document.getElementById("cartButton").onclick = () => openCart ();
    document.getElementById("closeCartButton").onclick = () => closeCart ();
    return () => {
      document.body.removeChild(productsDiv);
    };
  }, []);

  return (
    <>
      <h1 className="container">Products</h1>
      <input id="searchInput"></input>
      <button id="searchButton">Search</button>
      <button id="cartButton">Cart</button>
      <dialog id="cartModal">
        <button id="closeCartButton"></button>
      </dialog>
    </>
  );
}

export default App;
