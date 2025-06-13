import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function EditEmployee() {
  let { eid, bid } = useParams();
  const [employee, setEmployee] = useState({});
  const role = useSelector((state) => state.auth.role);
  console.log(role);
  const formData = new FormData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `/API/owner/business/${bid}/manage/employee/${eid}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        setEmployee(res.data.employee);
        reset(res.data.employee);
      }
    }
    getData();
  }, []);

  const updateProfile = async (data) => {
    if (!data.file) {
      data.file = employee.img;
    }

    const fileArr = Array.from(data.file);
    console.log(data);
    formData.append("file", fileArr[0]);
    formData.append("data", JSON.stringify(data));

    const res = await axios.put(
      `/API/owner/business/${bid}/manage/employee/${eid}`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (res.data.isToken) {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Employee Data
          </h2>
        </div>

        {/* Name */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(updateProfile)}>
            {/* Image Upload Section */}

            <div>
              <img
                src={employee.img?.secure_url || "/default-avatar.png"}
                defaultValue={employee.img?.secure_url}
                alt={employee.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                {...register("file")}
              />
              {errors.file && (
                <p className="text-red-500 tex-sm mt-1">
                  {errors.file.message}
                </p>
              )}
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  defaultValue={employee.name}
                  id="name"
                  type="text"
                  {...register("name", { required: "name is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  defaultValue={employee.email}
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  defaultValue={employee.password}
                  id="password"
                  type="password"
                  autoComplete="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Salary  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Salary
                </label>
              </div>
              <div className="mt-2">
                <input
                  defaultValue={employee.salary}
                  id="salary"
                  type="number"
                  {...register("salary", { required: "salary is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  defaultValue={employee.address}
                  id="address"
                  type="text"
                  autoComplete="name"
                  {...register("address", { required: "address is required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Mo. no */}
            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  defaultValue={employee.mobileNumber}
                  id="mobileNumber"
                  type="number"
                  title="Please enter a valid mobile number"
                  autoComplete="name"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  defaultValue={employee.description}
                  id="description"
                  cols="44"
                  rows="4"
                  {...register("description")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            {/* Work page */}
            {role == "owner" && (
              <div>
                <label
                  htmlFor="workpage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Work Page
                </label>

                <select
                  id="workpage"
                  name="workpage"
                  defaultValue={employee.workpage}
                  required={true}
                  {...register("workpage")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="No">NO</option>
                  <option value="inventory_management">
                    Inventory Management
                  </option>
                  <option value="sale_management">Sale Management</option>
                  <option value="employee_management">
                    Employee Management
                  </option>
                  <option value="product_management">Product Management</option>
                </select>
              </div>
            )}

            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
