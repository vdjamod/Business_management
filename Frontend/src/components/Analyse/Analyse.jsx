import React, { useEffect, useState } from "react";
import ProductStock from "./charts/ProductStock";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductSale from "./charts/ProductSale";
import OwnerHeader from "../Owner/OwnerHeader";

function Analyse() {
  const [productStock, setProductStock] = useState([]);
  const [productSale, setProductSale] = useState([]);
  const { id, bid } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        const res1 = await axios.get(
          `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/inventory/get-products`,
          {
            withCredentials: true,
          }
        );

        setProductStock(res1.data.data);
      } catch (e) {
        console.log(e);
      }

      try {
        const res = await axios.get(
          `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/product`,
          {
            withCredentials: true,
          }
        );

        setProductSale(res.data.allProduct);
      } catch (error) {
        console.log(error);
      }

      // const res = await axios.get(
      //   `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/sale/turnover`,
      //   {
      //     withCredentials: true,
      //   }
      // );
    }

    getData();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <OwnerHeader />
        <div className=" min-h-screen">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <ProductStock Data={productStock} />
                <p className=" text-center text-gray-800 text-lg font-semibold">
                  Current month product stock
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <ProductSale Data={productSale} />
                <p className=" text-center text-gray-800 text-lg font-semibold">
                  Product Manufacturing Per Month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analyse;
