import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";
import { FaRupeeSign, FaEdit, FaTrash } from "react-icons/fa";
import GeneralModal from "../../Utils/GeneralModal";
// eslint-disable-next-line no-undef

function Product() {
  const [allProduct, setAllProduct] = useState([]);
  let { id, bid } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/product`,
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        setAllProduct(res.data.allProduct);
      }
    }
    getData();
  }, []);

  const addProduct = (id) => {
    navigate(`/owner/business/${bid}/manage/product/new`);
  };

  const updateProduct = async (pdctid) => {
    navigate(`/owner/business/${bid}/manage/product/${pdctid}/edit`);
  };

  const deleteProduct = async () => {
    const res = await axios.delete(
      `https://business-management-backend-ghf2.onrender.com/owner/business/${bid}/manage/product/${productToDelete}`,
      {
        withCredentials: true,
      }
    );
    setIsModalOpen(false);

    if (res.data.isToken) {
      setAllProduct((prev) =>
        prev.filter((product) => product._id !== productToDelete)
      );
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <GeneralModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={deleteProduct}
          confirmText="Delete"
          cancelText="Cancel"
        />
        <OwnerHeader />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
            <button
              onClick={() => addProduct(id)}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow transition"
            >
              + Add New Product
            </button>
          </div>

          {allProduct.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProduct.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {post.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    {post.description}
                  </p>

                  <div className="text-gray-700 text-sm space-y-1 mb-4">
                    <p className="flex items-center gap-1">
                      <FaRupeeSign className="text-gray-500" size={14} />
                      <span className="font-medium">Cost:</span> ₹{post.price}
                    </p>
                    <p className="flex items-center gap-1">
                      <FaRupeeSign className="text-gray-500" size={14} />
                      <span className="font-medium">Revenue:</span> ₹
                      {post.revenue}
                    </p>
                  </div>

                  <div className="flex gap-4 text-sm mt-3">
                    <button
                      onClick={() => updateProduct(post._id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        // deleteProduct(post._id);
                        setProductToDelete(post._id);
                        setIsModalOpen(true);
                      }}
                      className="flex items-center gap-1 text-red-500 hover:text-red-800"
                    >
                      <FaTrash size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-16">
              No products found. Click "Add New Product" to get started.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
