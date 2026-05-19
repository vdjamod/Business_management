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
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function EmployeeHome() {
  const { id, bid } = useParams();
  const [allEmployee, setAllEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState({ min: "", max: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  async function getData() {
    const res = await axios.get(
      `http://localhost:3000/owner/business/${bid}/manage/employee`,
      {
        withCredentials: true,
      },
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

  const handleView = (eid) => {
    setOpenMenuId(null);
    navigate(`/owner/business/${bid}/manage/employee/${eid}`);
  };

  const deleteEmployee = async () => {
    const res = await axios.delete(
      `http://localhost:3000/owner/business/${bid}/manage/employee/${employeeToDelete}`,
      {
        withCredentials: true,
      },
    );

    if (res.data.isToken) {
      setAllEmployee((prev) =>
        prev.filter((emp) => emp._id !== employeeToDelete),
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

          {/* Employee List */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center px-4 py-3 border-b border-gray-100 text-sm text-gray-500 font-medium">
              <div className="w-1/3">Name & Role</div>
              <div className="w-1/3">Contact Information</div>
              <div className="w-1/6">Status</div>
              <div className="w-1/6 text-right">Actions</div>
            </div>

            {filteredEmployees.length > 0 &&
              filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="flex items-center px-4 py-4 border-b last:border-b-0"
                >
                  <div className="w-1/3 flex items-center gap-4">
                    <img
                      src={employee.img?.secure_url || "/default-avatar.png"}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {employee.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        @{employee.name?.toLowerCase?.().replace(/\s+/g, "")}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                          {employee.workpage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                      <span>{employee.email || "No email"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <PhoneIcon className="h-4 w-4 text-gray-400" />
                      <span>{employee.mobileNumber}</span>
                    </div>
                  </div>

                  <div className="w-1/6 text-sm text-gray-600">
                    <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="w-1/6 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === employee._id ? null : employee._id,
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      {openMenuId === employee._id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleView(employee._id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              handleUpdate(employee._id, {
                                preventDefault: () => {},
                              });
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              setEmployeeToDelete(employee._id);
                              setIsModalOpen(true);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {allEmployee.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No employees found.
              </div>
            )}
            {allEmployee.length > 0 && filteredEmployees.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No matching employee found.
              </div>
            )}
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
