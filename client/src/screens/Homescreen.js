import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Carousel from 'react-bootstrap/Carousel';

import Product from "../components/Product";

export default function Homescreen() {
  const getAllProductsState = useSelector(
    (state) => state.getAllProductsReducer
  );

  const { loading, products, error } = getAllProductsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  //filtre de category fe fashion 

  const filteredProductsFashion = products ? products.filter(product => product.category.toLowerCase().includes("fashion")) : [];


  // Check if products array is not empty
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  // Group products into sets of three
  const groupedProductsfashion = [];
  for (let i = 0; i < filteredProductsFashion.length; i += 3) {
    groupedProductsfashion.push(filteredProductsFashion.slice(i, i + 3));
  }
  //filtre de category fe games 

  const filteredProductsgames = products ? products.filter(product => product.category.toLowerCase().includes("games")) : [];


  // Check if products array is not empty
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  // Group products into sets of three
  const groupedProductsgames = [];
  for (let i = 0; i < filteredProductsgames.length; i += 3) {
    groupedProductsgames.push(filteredProductsgames.slice(i, i + 3));
  }
  
  

  return (
    <div>
      <Filter />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error="Something went wrong..." />
      ) : (
        
        <div>
          <h1>fashion</h1>
          <br></br>
          <Carousel>
            {groupedProductsfashion.map((productGroup, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center align-items-center h-100">
                  {productGroup.map((product) => (
                    <div key={product._id} className="col-md-4 m-2 p-2 shadow p-3 mb-5 bg-white rounded card">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <br></br>
          <h1>games</h1>
          <br></br>
          <Carousel>
            {groupedProductsgames.map((productGroup, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center align-items-center h-100">
                  {productGroup.map((product) => (
                    <div key={product._id} className="col-md-4 m-2 p-2 shadow p-3 mb-5 bg-white rounded card">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
