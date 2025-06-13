import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";
import GeneralModal from "../../Utils/GeneralModal";

// Icons
import {
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default function EmployeeHome() {
  const { id, bid } = useParams();
  const [allEmployee, setAllEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState({ min: "", max: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();

  async function getData() {
    const res = await axios.get(
      `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/employee`,
      {
        withCredentials: true,
      }
    );

    if (res.data.isToken) {
      setAllEmployee(res.data.allEmployee || []);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  const handleUpdate = (eid, event) => {
    event.preventDefault();
    navigate(`/owner/business/${bid}/manage/employee/${eid}/edit`);
  };

  const deleteEmployee = async () => {
    const res = await axios.delete(
      `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/employee/${employeeToDelete}`,
      {
        withCredentials: true,
      }
    );

    if (res.data.isToken) {
      setAllEmployee((prev) =>
        prev.filter((emp) => emp._id !== employeeToDelete)
      );
    }
  };

  const filteredEmployees =
    allEmployee.length > 0
      ? allEmployee.filter((employee) => {
          const matchesName = employee.name
            ?.toLowerCase()
            .startsWith(searchTerm.toLowerCase());

          const salary = Number(employee.salary);
          const min = Number(salaryFilter.min) || 0;
          const max = Number(salaryFilter.max) || Infinity;

          const matchesSalary = salary >= min && salary <= max;

          return matchesName && matchesSalary;
        })
      : [];

  const handleAdd = () => {
    navigate(`/owner/business/${bid}/manage/employee/new`);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <GeneralModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={deleteEmployee}
          confirmText="Delete"
          cancelText="Cancel"
        />
        <OwnerHeader />
        <div className="p-6 sm:p-10 bg-gray-50 min-h-screen">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Employees
          </h1>

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                onChange={(e) =>
                  setSalaryFilter((prev) => ({ ...prev, min: e.target.value }))
                }
                placeholder="Min salary"
                className="h-11 w-full sm:w-32 border border-gray-300 rounded-lg shadow-sm px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                onChange={(e) =>
                  setSalaryFilter((prev) => ({ ...prev, max: e.target.value }))
                }
                placeholder="Max salary"
                className="h-11 w-full sm:w-32 border border-gray-300 rounded-lg shadow-sm px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Search employee by name..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 w-full sm:w-80 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Add Employee Button */}
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition"
            >
              + Add Employee
            </button>
          </div>

          {/* Employee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.length > 0 &&
              filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6"
                >
                  {/* Top Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={employee.img.secure_url || "/default-avatar.png"}
                      alt={employee.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {employee.name}
                      </h2>a
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <EnvelopeIcon className="h-4 w-4 mr-1" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <PhoneIcon className="h-4 w-4 mr-1" />
                        {employee.mobileNumber}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-700 space-y-1 mb-4 leading-relaxed">
                    <p>
                      <span className="font-medium text-gray-900">Salary:</span>{" "}
                      ₹{employee.salary}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">
                        Address:
                      </span>{" "}
                      {employee.address}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">
                        Description:
                      </span>{" "}
                      {employee.description || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Role:</span>{" "}
                      {employee.workpage}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4 pt-3 border-t border-gray-200">
                    <button
                      onClick={(e) => handleUpdate(employee._id, e)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      // onClick={() => handleDelete(employee._id)}
                      onClick={() => {
                        setEmployeeToDelete(employee._id);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium transition"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Empty States */}
          {allEmployee.length === 0 && (
            <div className="text-center text-gray-500 mt-16 text-lg">
              No employees found.
            </div>
          )}
          {allEmployee.length > 0 && filteredEmployees.length === 0 && (
            <div className="text-center text-gray-500 mt-16 text-lg">
              No matching employee found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
