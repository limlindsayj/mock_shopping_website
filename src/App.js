import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
  var productsDiv = document.createElement("div");
  productsDiv.id = "products";
  document.body.appendChild(productsDiv)
  fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    var node, textnode;
      for (const x in data.products) {
        node = document.createElement("div");
        textnode = document.createTextNode(x);
        node.appendChild(textnode);
        document.getElementById("products").appendChild(node)
      }
  });
  return () => {
    document.body.removeChild(productsDiv);
  }
  }, []);


  return (
    <>
      <h1>Products</h1>
    </>
  );
}

export default App;
