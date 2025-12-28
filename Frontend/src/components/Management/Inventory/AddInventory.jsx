import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddInventory() {
  const { bid } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getProducts() {
    try {
      const res = await axios.get(
        `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/inventory/get-products`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      setAllProducts(res.data.data);
    } catch (error) {
      console.log("Failed to load products", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const addInventory = async (data) => {
    let keys = Object.values(data);
    const quantity = keys.map(Number);

    const history = allProducts.map((product, idx) => ({
      name: product.name,
      stock: parseInt(data[product.name], 10) || 0,
    }));

    try {
      const res = await axios.post(
        `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/inventory`,
        {
          quantity,
          history,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.status) {
        navigate(-1);
      }
    } catch (error) {
      console.log("Inventory Update failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
        Update Inventory
      </h2>
      <form onSubmit={handleSubmit(addInventory)} className="space-y-6">
        {allProducts.length > 0 &&
          allProducts.map((product, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={`product-${index}`}
                className="text-gray-700 font-medium"
              >
                {product.name}
              </label>

              <input
                id={`product-${index}`}
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                {...register(`${product.name}`, {
                  required: "Quantity is required",
                })}
              />

              {errors[product.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[product.name]?.message}
                </p>
              )}

              <span className="text-sm text-gray-600">
                Current stock: {product.stock}
              </span>
            </div>
          ))}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddInventory;
