import { useParams, Link } from "react-router-dom";
import OwnerHeader from "../Owner/OwnerHeader";

function Manage() {
  const { id, bid } = useParams();

  const sections = [
    {
      name: "Products",
      path: "product",
      description: "Manage all products for this business.",
    },
    {
      name: "Employees",
      path: "employee",
      description: "Add or update employee details.",
    },
    {
      name: "Sales",
      path: "sale",
      description: "Track and manage business sales.",
    },
    {
      name: "Inventory",
      path: "inventory",
      description: "Manage stock and inventory levels.",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <OwnerHeader Businessid={bid} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-10">
            Manage Your Business
          </h1>

          {/* ✅ 2x2 Grid for 4 sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <Link
                key={section.path}
                to={`/owner/business/${bid}/manage/${section.path}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition group"
              >
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                  {section.name}
                </h2>
                <p className="text-gray-500">{section.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Manage;
