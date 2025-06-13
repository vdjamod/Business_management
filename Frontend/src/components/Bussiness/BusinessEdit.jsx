import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function BusinessEdit() {
  const { bid } = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `/API/owner/business/${bid}`,
        {
          withCredentials: true,
        }
      );

      setBusinessData(res.data.business);
      reset(res.data.business);
    }

    getData();
  }, []);

  const handleBusiness = async (data) => {
    const { name, assets, haveEquity, description } = data;

    const res = await axios.post(
      `/API/owner/business/${bid}`,
      {
        name,
        assets,
        haveEquity,
        description,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      navigate("/owner");
    }
  };

  return (
    <>
      {businessData && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create Business
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(handleBusiness)}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Business Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    defaultValue={businessData.name}
                    {...register("name", { required: "Name is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="assets"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Assets
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="number"
                      name="assets"
                      defaultValue={businessData.assets}
                      id="assets"
                      {...register("assets", {
                        required: "Assets is required",
                      })}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.assets && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.assets.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="haveEquity"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    haveEquity
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="number"
                      id="haveEquity"
                      defaultValue={businessData.haveEquity}
                      {...register("haveEquity", {
                        required: "Equity is required",
                      })}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.equity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.haveEquity.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    type="description"
                    defaultValue={businessData.description}
                    {...register("description")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BusinessEdit;
