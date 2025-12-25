import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EmployeeData() {
  let { id, empid } = useParams();
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    async function getData() {
      console.log(empid);

      const res = await axios.get(
        `http://localhost:3000/owner/manage/employee/${empid}`,
        {
          withCredentials: true,
        }
      );

      setEmployee(res.data);
    }
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-8  min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div class="mb-5 mt-5 block bg-red-100 rounded-lg w-72 overflow-y-auto ">
          <div
            class="relative overflow-hidden bg-cover bg-no-repeat"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <img
              class="rounded-lg  sm:m-h-64 md:h-64 w-full"
              src={employee.imgUrl}
              alt=""
            />
            <a href="#!">
              <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
            </a>
          </div>

          <div class="p-2">
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>Name</span>
              </b>
              : {employee.name}
            </p>

            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>Email</span>
              </b>
              : {employee.email}
            </p>
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>Salary</span>
              </b>
              : {employee.salary}
            </p>

            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>Date of Joining: </span>
              </b>
              : {employee.dateOfJoining}
            </p>

            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>Address</span>
              </b>
              : {employee.address}
            </p>
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>State</span>
              </b>
              : {employee.state}
            </p>

            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>City</span>
              </b>
              : {employee.city}
            </p>

            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>mobileNumber</span>
              </b>
              : {employee.mobileNumber}
            </p>
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>Date Of Birth</span>
              </b>
              : {employee.dob}
            </p>

            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>designation</span>
              </b>
              : {employee.designation}
            </p>
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>degree</span>
              </b>
              : {employee.degree}
            </p>
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>branch</span>
              </b>
              : {employee.branch}
            </p>
            <p class="mb-1 text-base text-neutral-600 dark:text-neutral-900">
              <b>
                <span style={{ opacity: 0.78 }}>other</span>
              </b>
              : {employee.other}
            </p>
          </div>
          <div className="relative mt-8 flex items-center gap-x-4">
            <form
              method="get"
              action={`/owner/manage/employee/${employee._id}/edit`}
            >
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
              >
                Edit
              </button>
            </form>
            <form
              method="post"
              action={`http://localhost:3000/owner/manage/employee/${empid}?_method=DELETE`}
            >
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
