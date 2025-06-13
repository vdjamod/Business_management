import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function DaySaleInput() {
  const { id, bid } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
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

      if (res.data.isToken) {
        setAllProducts(res.data.data);
      }
    } catch (error) {
      console.log("Failed to load products", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const allSale = async (data) => {
    let { mcost, ocost } = data;

    delete data.mcost;
    delete data.ocost;

    let keys = Object.values(data);
    const quantity = keys.map(Number);

    allProducts.map((product, index) => {
      product.quantity = quantity[index];
      delete product.stock;
    });

    const history = [...allProducts];

    try {
      const res = await axios.post(
        `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/sale`,
        {
          quantity,
          history,
          mcost,
          ocost,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        const currPath = location.pathname;
        const newPath = currPath.replace(/\/add$/, "");
        navigate(newPath);
      }
    } catch (error) {
      console.log("Product Sale failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Sale Input
      </h2>

      <form onSubmit={handleSubmit(allSale)} className="space-y-6">
        {allProducts.length > 0 ? (
          allProducts.map((product, index) => {
            const stk = product.stock;

            return (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
              >
                <label
                  htmlFor={`product-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {product.name}
                </label>

                <input
                  id={`product-${index}`}
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(`${product.name}`, {
                    required: "Quantity is required",
                    validate: (value) =>
                      parseInt(value) <= stk ||
                      `Exceeds available stock (${stk})`,
                  })}
                />

                {errors[product.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[product.name]?.message}
                  </p>
                )}

                <span className="text-xs text-gray-500">
                  Available stock: {product.stock}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No sale units available.
          </p>
        )}

        {/* Marketing Cost */}
        <div className="space-y-1">
          <label
            htmlFor="mcost"
            className="block text-sm font-medium text-gray-700"
          >
            Marketing Cost
          </label>
          <input
            id="mcost"
            type="number"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("mcost", {
              required: "Marketing Cost is required",
            })}
          />
          {errors.mcost && (
            <p className="text-red-500 text-xs">{errors.mcost.message}</p>
          )}
        </div>

        {/* Other Cost */}
        <div className="space-y-1">
          <label
            htmlFor="ocost"
            className="block text-sm font-medium text-gray-700"
          >
            Other Cost
          </label>
          <input
            id="ocost"
            type="number"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("ocost", {
              required: "Other Cost is required",
            })}
          />
          {errors.ocost && (
            <p className="text-red-500 text-xs">{errors.ocost.message}</p>
          )}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm transition duration-200">
          Submit Sale
        </button>
      </form>
    </div>
  );
}

export default DaySaleInput;
