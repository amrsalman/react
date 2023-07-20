import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import style from "./Categories.module.css";
export default function Categories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 8,
  };
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      "https://king-prawn-app-3mgea.ondigitalocean.app/category"
    );
    setCategory(data.category);
  }
  async function getSubCategories(_id) {
    let { data } = await axios.get(
      `https://king-prawn-app-3mgea.ondigitalocean.app/category/${_id}/subcategory`
    );
    setSubCategory(data.subcategory);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    < >
      <div className="container my-5">
        <div className="row">
          <Slider {...settings}>
            {category.map((category) => {
              return (
                <>
                  <div className="col-md-8">
                    <div className="category text-center">
                      <img
                        src={category.image.secure_url}
                        alt={category.name}
                        className={`${style.img} w-100`}
                        onClick={() => getSubCategories(category._id)}
                      />
                    
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="container mx-auto my-5">
        <div className="row">
      {subCategory.map((subCategory) => {
        return (
          <>
            <div className="col-md-3">
              <div className="category text-center">
                <img
                  src={subCategory.image.secure_url}
                  alt={subCategory.name}
                  className={`${style.img} w-100`}
                />
               
              </div>
            </div>
          </>
        );
      })}
        </div>
      </div>
    </>
  );
}
