import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cart from './components/Cart';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { products } from './data/products.json';

function App() {

  const [state, setState] = useState({
    selectedSizes: [],
  });

  let initCart;
  if (localStorage.getItem("carts") !== null && localStorage.getItem("carts").length > 0) {
    initCart = JSON.parse(localStorage.getItem("carts"));
  } else {
    initCart = [];
  }

  const [cartState, setCartState] = useState({
    cartItems: initCart,
  });

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cartState.cartItems));
  }, [cartState.cartItems]);

  const handleAddToCart = (p) => {
    let isItemInCart = cartState.cartItems.findIndex((product) => product.id === p.id) !== -1;
    if(isItemInCart) {
      handleIncrementQuantity(p.id);
    } else {
      setCartState((prevState) => ({
        cartItems: prevState.cartItems.concat({ ...p, quantity:1 }),
      }));
    }
  }

  const handleIncrementQuantity = (id) => {
    setCartState((prevState) => {
      let updatedCartItems = prevState.cartItems.map((product) => {
        if(product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1
          }
        }
        return product;
      });
      return {
        cartItems: updatedCartItems
      }
    });
  }

  const handleDecrementQuantity = (id) => {
    setCartState((prevState) => {
      let updatedCartItems = prevState.cartItems.map((product) => {
        if(product.id === id) {
          return {
            ...product,
            quantity: product.quantity > 1 ? product.quantity - 1 : product.quantity
          }
        }
        return product;
      });
      return {
        cartItems: updatedCartItems
      }
    });
  }

  const handleRemoveCartItem = (id) => {
    setCartState((prevState) => {
      let removeCartItems = prevState.cartItems.filter((product) => {
        return product.id !== id;
      });
      return {
        cartItems: removeCartItems
      }
    });
  }

  const handleClick = (size) => {
    if(state.selectedSizes.includes(size)) {
      setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.filter((s) => s !== size),
      }));
    } else {
      setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.concat(size),
      }));
    }
  }

  return (
    <>
      <BrowserRouter>
        <Header cartItems={cartState.cartItems} />
        <Switch>
          <Route exact path="/">
            <div className="wrap">
              <Sidebar products={products} selectedSizes={state.selectedSizes} handleClick={handleClick} />
              <Main products={products} selectedSizes={state.selectedSizes} handleAddToCart={handleAddToCart} />
            </div>
          </Route>
          <Route path="/cart">
            <Cart cartItems={cartState.cartItems} handleIncrementQuantity={handleIncrementQuantity} handleDecrementQuantity={handleDecrementQuantity} handleRemoveCartItem={handleRemoveCartItem} />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
