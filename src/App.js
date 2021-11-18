import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import { products } from './data/products.json';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken } from './utils/Common';

import axios from 'axios';
import Users from './components/Users';
axios.defaults.baseURL = "http://localhost:8000";

function App() {

  const [isLoggedin, setIsLoggedin] = useState(getToken() ? true : false);

  let initCart;
  if (localStorage.getItem("carts") !== null && localStorage.getItem("carts").length > 0) {
    initCart = JSON.parse(localStorage.getItem("carts"));
  } else {
    initCart = [];
  }

  const [state, setState] = useState({
    selectedSizes: [],
  });

  const [cartState, setCartState] = useState({
    cartItems: initCart,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [successMessage, setSuccessMessage] = useState("");

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

    //Display success message
    setSuccessMessage("Product added successfully.");
    setTimeout(() => {
      setSuccessMessage("");
    }, [1000]);
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

  const handleClearCart = () => {
    setCartState({ 
      cartItems: [] 
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

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  //Next page
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  //Previous page
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  return (
    <>
      <BrowserRouter>
        <Header
          cartItems={cartState.cartItems}
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <PrivateRoute
            path="/users"
            component={() => <Users />}
          />

          <Route path="/shop">
            <Shop 
              products={products} 
              selectedSizes={state.selectedSizes} 
              handleClick={handleClick}
              currentProducts={currentProducts}  
              handleAddToCart={handleAddToCart} 
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              currentPage={currentPage}
              successMessage={successMessage}
            />
          </Route>

          <PublicRoute
            path="/login"
            component={() => <Login setIsLoggedin={setIsLoggedin} />}
          />

          <PublicRoute
            path="/register"
            component={() => <Register setIsLoggedin={setIsLoggedin} />}
          />

          <PublicRoute
            path="/forgot-password"
            component={() => <ForgotPassword />}
          />

          <Route path="/cart">
            <Cart 
              cartItems={cartState.cartItems} 
              handleIncrementQuantity={handleIncrementQuantity} 
              handleDecrementQuantity={handleDecrementQuantity} 
              handleRemoveCartItem={handleRemoveCartItem} 
              handleClearCart={handleClearCart}
            />
          </Route>
          
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
