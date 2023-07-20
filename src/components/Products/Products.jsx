import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Products() {
  let [product, setProduct] = useState([]);
  async function getProducts() {
    let { data } = await axios.get(
      "https://king-prawn-app-3mgea.ondigitalocean.app/product"
    );
    setProduct(data.products);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="row">
      <div className="my-4">Products</div>
      <div className="col-md-4">
        {product.map((product) => 
          <div className="col-md-4">
            <img
              src={product.mainImage.secure_url}
              className="w-100"
              alt="product"
            />
            <h6>{product.name}</h6>
          </div>
        )}
      </div>
    </div>
  );
}
