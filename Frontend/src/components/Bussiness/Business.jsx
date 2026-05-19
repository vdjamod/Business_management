import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Business() {
  const { id, bid } = useParams();
  const [business, setBusiness] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://localhost:3000/owner/business/${bid}/view`,
          { withCredentials: true }
        );

        if (res.data.isToken) {
          setBusiness(res.data.business);
        } else {
          setError("Unauthorized or invalid token.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching business data.");
      }
    }

    getData();
  }, [bid]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex gap-4 mb-8">
        <Link
          to={`/owner/business/${bid}/manage`}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow"
        >
          Manage
        </Link>
        <Link
          to={`/owner/business/${bid}/analyse`}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow"
        >
          Analyse
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <h1 className="text-3xl font-bold text-gray-800">{business.name}</h1>
    </div>
  );
}

export default Business;
