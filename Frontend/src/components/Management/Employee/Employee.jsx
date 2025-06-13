import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, Home, User, IndianRupee } from "lucide-react";
import EmployeeHeader from "./EmployeeHeader";

function Employee() {
  const { eid } = useParams();
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`https://business-management-backend-ghf2.onrender.com/employee/${eid}`, {
        withCredentials: true,
      });

      console.log(res.data);

      if (res.data.success) {
        setEmployeeData(res.data.employee);
      }
    }
    getData();
  }, [eid]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <EmployeeHeader employeeData={employeeData} />

        <div className="flex flex-col items-center mt-10 px-4">
          <img
            src={employeeData.img?.secure_url}
            // src={EmployeeImg}
            alt={employeeData.name}
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />

          <h1 className="mt-4 text-3xl font-semibold text-gray-800">
            Welcome, <span className="text-blue-600">{employeeData.name}</span>
          </h1>

          <div className="mt-6 w-full max-w-3xl bg-gray-100 rounded-xl p-6 shadow-md space-y-4 text-gray-700">
            <InfoRow
              icon={<Mail className="text-blue-600" />}
              label="Email"
              value={employeeData.email}
            />
            <InfoRow
              icon={<Phone className="text-green-600" />}
              label="Mobile"
              value={employeeData.mobileNumber}
            />
            <InfoRow
              icon={<Home className="text-yellow-500" />}
              label="Address"
              value={employeeData.address}
            />
            <InfoRow
              icon={<User className="text-purple-600" />}
              label="Description"
              value={employeeData.description}
            />
            <InfoRow
              icon={<IndianRupee className="text-red-500" />}
              label="Salary"
              value={`₹${employeeData.salary}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 text-base">
      <div className="mt-0.5">{icon}</div>
      <div>
        <span className="font-semibold">{label}:</span> {value || "-"}
      </div>
    </div>
  );
}

export default Employee;
