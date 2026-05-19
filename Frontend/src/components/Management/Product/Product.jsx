import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";
import { FaEdit, FaTrash, FaFilter, FaInfoCircle, FaEllipsisV, FaProductHunt } from "react-icons/fa";
import GeneralModal from "../../Utils/GeneralModal";

function Product() {
  const [allProduct, setAllProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [skuFilter, setSkuFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeFilters, setActiveFilters] = useState({ name: "", sku: "", category: "All" });
  const [activeMenuId, setActiveMenuId] = useState(null);
  
  let { bid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `http://localhost:3000/owner/business/${bid}/manage/product`,
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        setAllProduct(res.data.allProduct);
      }
    }
    getData();
  }, [bid]);

  const addProduct = () => {
    navigate(`/owner/business/${bid}/manage/product/new`);
  };

  const updateProduct = (pdctid) => {
    navigate(`/owner/business/${bid}/manage/product/${pdctid}/edit`);
  };

  const deleteProduct = async () => {
    const res = await axios.delete(
      `http://localhost:3000/owner/business/${bid}/manage/product/${productToDelete}`,
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

  const handleApplyFilters = () => {
    setActiveFilters({
      name: nameFilter,
      sku: skuFilter,
      category: categoryFilter
    });
  };

  const filteredProducts = useMemo(() => {
    return allProduct.filter((pdct) => {
      // Name Match
      const matchesName = pdct.name.toLowerCase().includes(activeFilters.name.toLowerCase());
      
      // Generate clean mock SKU for matching
      const mockSku = `SKU-${pdct.name.replace(/\s+/g, "-").toUpperCase()}`;
      const matchesSku = mockSku.toLowerCase().includes(activeFilters.sku.toLowerCase()) || 
                         (pdct.description && pdct.description.toLowerCase().includes(activeFilters.sku.toLowerCase()));
      
      // Category Match
      let mockCategory = "Other";
      const nameLower = pdct.name.toLowerCase();
      if (nameLower.includes("charger")) mockCategory = "CHARGER";
      else if (nameLower.includes("iphone")) mockCategory = "IPHONE";
      else if (nameLower.includes("mac")) mockCategory = "MACBOOK";

      const matchesCategory = activeFilters.category === "All" || mockCategory === activeFilters.category;

      return matchesName && matchesSku && matchesCategory;
    });
  }, [allProduct, activeFilters]);

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

        <div className="max-w-7xl mx-auto px-4 py-8 bg-slate-50/50 rounded-[2.5rem] mt-6 border border-slate-100 shadow-sm">
          
          {/* Header Title Bar */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Product Catalogue</h1>
              <p className="text-sm text-slate-550 mt-1">Configure retail price tiers, custom margins, and track base profit projections.</p>
            </div>
            <button
              onClick={addProduct}
              className="flex items-center gap-2 text-white bg-slate-900 hover:bg-slate-800 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              + Add New Product
            </button>
          </div>

          {/* Filters Form Block */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm mb-10">
            <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold border-b border-slate-100 pb-3">
              <FaFilter className="text-slate-400" />
              <span>Filters</span>
              <span className="text-xs text-slate-400 font-medium font-mono">Search by name, SKU, or category.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 py-3 px-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">SKU / Description</label>
                <input
                  type="text"
                  placeholder="Search by SKU"
                  value={skuFilter}
                  onChange={(e) => setSkuFilter(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 py-3 px-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 py-3 px-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 sm:text-sm"
                >
                  <option value="All">All categories</option>
                  <option value="CHARGER">Charger</option>
                  <option value="IPHONE">iPhone</option>
                  <option value="MACBOOK">MacBook</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleApplyFilters}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Product Card Grid */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
              <FaProductHunt size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Products</h3>
              <p className="text-xs text-slate-450">View and manage all products</p>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((post) => {
                // Mock SKU & Category Generation
                const nameLower = post.name.toLowerCase();
                let mockSku = "CH-MAC-35W";
                let mockCategory = "CHARGER";

                if (nameLower.includes("iphone 14")) {
                  mockSku = "IP-14";
                  mockCategory = "IPHONE";
                } else if (nameLower.includes("iphone 15")) {
                  mockSku = "IP-15";
                  mockCategory = "IPHONE";
                } else if (nameLower.includes("iphone 13")) {
                  mockSku = "IP-13";
                  mockCategory = "IPHONE";
                } else if (nameLower.includes("20w charger")) {
                  mockSku = "CH-IP-20W";
                  mockCategory = "CHARGER";
                } else if (nameLower.includes("m3")) {
                  mockSku = "MBA-M3";
                  mockCategory = "MACBOOK";
                } else if (nameLower.includes("m4")) {
                  mockSku = "MBA-M4";
                  mockCategory = "MACBOOK";
                } else {
                  mockSku = `SKU-${post.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`;
                  mockCategory = nameLower.includes("charger") ? "CHARGER" : nameLower.includes("mac") ? "MACBOOK" : "OTHER";
                }

                // Dynamic Price calculations matching user screenshots
                const basePrice = post.price || 0;
                const costPrice = post.cost || 0;
                const outputGstRate = mockCategory === "CHARGER" && mockSku !== "CH-IP-20W" ? 0.15 : 0.18;
                const outputGst = basePrice * outputGstRate;
                const finalSellingPrice = basePrice + outputGst;
                const netProfit = basePrice - costPrice;
                const inputGst = costPrice * 0.18;

                const shortId = post._id.substring(post._id.length - 4);

                return (
                  <div
                    key={post._id}
                    className="relative bg-white rounded-[2rem] border border-slate-200/70 p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-xl font-black text-slate-900">{post.name}</h2>
                          <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono mt-0.5">
                            SKU: {mockSku} &nbsp; ID: {shortId}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md">
                            Active
                          </span>
                          <div className="relative">
                            <button
                              onClick={() => setActiveMenuId(activeMenuId === post._id ? null : post._id)}
                              className="text-slate-400 hover:text-slate-650 p-1.5 rounded-lg hover:bg-slate-55"
                            >
                              <FaEllipsisV size={12} />
                            </button>

                            {/* Dropdown Options */}
                            {activeMenuId === post._id && (
                              <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-150 rounded-xl shadow-lg z-20 py-1.5 font-sans">
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    updateProduct(post._id);
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <FaEdit size={11} className="text-blue-500" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setProductToDelete(post._id);
                                    setIsModalOpen(true);
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <FaTrash size={11} />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <span className="inline-block bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-4">
                        {mockCategory}
                      </span>

                      {/* Description */}
                      <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
                        {post.description}
                      </p>

                      {/* Financial Aggregator details */}
                      <div className="space-y-2 border-t border-dashed border-slate-100 pt-4 font-sans">
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <FaInfoCircle size={10} className="text-slate-350" /> Cost Price
                          </span>
                          <span className="font-bold text-slate-900 font-mono">₹{costPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <FaInfoCircle size={10} className="text-slate-350" /> Base Price
                          </span>
                          <span className="font-bold text-slate-900 font-mono">₹{basePrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Output GST ({(outputGstRate * 100).toFixed(2)}%)</span>
                          <span className="font-semibold font-mono">₹{outputGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-emerald-600 font-bold bg-emerald-50/50 px-2 py-1.5 rounded-lg border border-emerald-100/50">
                          <span className="uppercase tracking-wider text-[9px] font-black">Final Selling Price</span>
                          <span className="font-mono text-sm">₹{finalSellingPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-blue-650 font-bold bg-blue-50/40 px-2 py-1.5 rounded-lg border border-blue-100/50">
                          <span className="uppercase tracking-wider text-[9px] font-black">Net Profit</span>
                          <span className="font-mono text-sm">₹{netProfit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Input GST (18.00%)</span>
                          <span className="font-semibold font-mono">₹{inputGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-slate-500 font-semibold py-16 bg-white rounded-3xl border border-slate-100">
              No products found. Click "Add New Product" to get started.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
