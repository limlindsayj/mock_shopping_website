import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {


    const displayAll = () => {
      fetch('https://dummyjson.com/products').then(res => res.json()).then(data => {
        for (const key in data.products) {
          renderProduct(data.products[key])
        }
      });
    }


    const createProductsDiv = () => {
      const productsDiv = document.createElement("div");
      productsDiv.innerHTML = "";
      productsDiv.id = "products";
      productsDiv.classList.add("row", "container")
      document.body.appendChild(productsDiv);
      return productsDiv;
    };

    
    const searchClicked = () => {
      const search = document.getElementById("searchInput").value.trim().toUpperCase();
      document.getElementById("products").innerHTML = "";
      fetch('https://dummyjson.com/products').then(res => res.json()).then(data => {
        for (const key in data.products) {
          if (data.products[key].title.toUpperCase().includes(search) || data.products[key].category.toUpperCase().includes(search)) {
            renderProduct(data.products[key])
          }
        }
      });
      document.getElementById("searchInput").value = "";
    }

    const makeCard = (product, cart = "") => {
        const card = document.createElement("div");
        card.id = cart + "card" + product.id;
        card.classList.add(cart + "cardStyle");
        const cardBody = document.createElement("div");
        cardBody.id = cart + "cardBody" + product.id;
        cardBody.classList.add("cardBody")
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
        return card
    }
    

    const renderProduct = (product) => {
      if (!(document.getElementById("card" + product.id))) {
      const col = document.createElement("div");
      col.classList.add("col-md-3", "colStyle");
      const card = makeCard(product);
      const cardCartButton = document.createElement("button");
      cardCartButton.innerText = "Add to cart";
      cardCartButton.classList.add("addToCartButton");
      col.appendChild(card);
      document.getElementById("products").appendChild(col)
      console.log(document.getElementById("products").innerHTML);
      document.getElementById("cardBody" + product.id).appendChild(cardCartButton);
      cardCartButton.onclick = () => addToCart(product);
      }
    }


    const removeItemFromCart = (product) => {
      document.getElementById("cartModal").removeChild(document.getElementById("cartcard" + product.id));
    }


    const addToCart = (product) => {
      if (!document.getElementById("cartcard" + product.id)) {
        const itemCard = makeCard(product, "cart");
        const removeItemButton = document.createElement("button");
        removeItemButton.innerText = "Remove Item";
        removeItemButton.classList.add("removeItemButton")
        document.getElementById("cartModal").appendChild(itemCard);
        document.getElementById("cartcardBody" + product.id).appendChild(removeItemButton);
        removeItemButton.onclick = () => removeItemFromCart(product);
      }
    }


    const openCart = () => {
      document.getElementById("cartModal").showModal();
    }


    const closeCart = () =>{
      document.getElementById("cartModal").close();
    }
    

    createProductsDiv();
    displayAll();
    document.getElementById("searchButton").onclick = () => searchClicked ();
    document.getElementById("cartButton").onclick = () => openCart ();
    document.getElementById("closeCartButton").onclick = () => closeCart ();
    document.getElementById("products").innerHTML = "";

    
    return () => {
      document.body.removeChild(document.getElementById("products"));
    };
  }, []);

  
  return (
    <>
      <h1 id="productsHeading">Products</h1>
      <input id="searchInput"></input>
      <button id="searchButton">Search</button>
      <button id="cartButton">Cart</button>
      <dialog id="cartModal">
        <button id="closeCartButton">X</button>
      </dialog>
    </>
  );
}

export default App;
